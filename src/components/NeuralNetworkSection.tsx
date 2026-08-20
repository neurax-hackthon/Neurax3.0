import { forwardRef, useEffect, useRef } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { useInView } from "../hooks/useInView";

/* ============================================================================
 * CONFIGURATION
 * Everything that might need re-tuning after watching the final render
 * lives here. All timing values are fractions (0-1) of the pinned
 * section's scroll progress, which is also what drives the video's
 * currentTime (progress * video.duration).
 * ==========================================================================*/

// Cinematic camera-through-the-network clip. Contains the full network,
// the travel into node 1, the connection crossing, node 2, and the pull
// back out. No photos are baked into the footage - those are the HTML
// overlays below.
//
// This is a re-encoded copy of the original render with a much shorter
// keyframe interval (every 6 frames instead of the default ~120). Scroll
// scrubbing seeks to arbitrary timestamps continuously, and with long
// keyframe spacing the browser has to decode forward a long way on every
// seek - which reads as "the frame only catches up once you stop
// scrolling." Same footage, just seek-friendly. Re-generate with:
//   ffmpeg -i neurax-network.mp4 -an -c:v libx264 -preset medium -crf 20 \
//     -g 6 -keyint_min 6 -sc_threshold 0 -pix_fmt yuv420p \
//     -movflags +faststart neurax-network-scrub.mp4
const VIDEO_SRC = "/videos/neurax-network-crisp.mp4";

// Historical photos, revealed inside the empty glowing node centers.
const PHOTO_1_SRC = "/images/neurax-1.0.jpg";
const PHOTO_2_SRC = "/images/neurax-2.0.jpg";
const PHOTO_1_CAPTION = { eyebrow: "NODE 01 · 2024", title: "NeuraX 1.0" };
const PHOTO_2_CAPTION = { eyebrow: "NODE 02 · 2025", title: "NeuraX 2.0" };

// Measured by extracting reference frames from the actual exported clip
// (10.01s @ 1280x720) and pixel-sampling the hollow ring: both nodes land
// within ~2% of dead-center (source-space, i.e. before any object-fit
// cropping). A point that sits at the true center of the source frame
// stays centered under object-fit: cover no matter what aspect ratio the
// viewport is - cover always crops symmetrically around the center - so
// 50/50 is the one value that works on every screen without per-viewport
// math. If a re-rendered video frames the nodes off-center, re-measure by
// extracting a frame during the hold and locating the hollow ring's pixel
// center, then convert to a fraction of the source's width/height.
const NODE_SCREEN_POSITION = { leftPercent: 50, topPercent: 50 };

// Scroll-progress windows per photo, measured by scrubbing the clip:
//   node 1 starts hollowing out ~18%, fully open 30-40%, camera leaves
//   into the connection by ~47%; node 2 starts opening ~52%, fully open
//   62-79%, camera pulls back out by ~87%. Tune these four numbers per
//   photo if the timing drifts on a re-render.
const NODE_1_FADE_IN_START = 0.32;
const NODE_1_HOLD_START = 0.37;
const NODE_1_HOLD_END = 0.4;
const NODE_1_FADE_OUT_END = 0.47;

const NODE_2_FADE_IN_START = 0.57;
const NODE_2_HOLD_START = 0.67;
const NODE_2_HOLD_END = 0.79;
const NODE_2_FADE_OUT_END = 0.87;

// Total scroll distance the pinned section consumes, in viewport heights.
// Deliberately long: the camera journey should read as a few unhurried
// scroll gestures, not resolve in a single flick of the wheel.
const SCROLL_DISTANCE_VH = 480;

/* ==========================================================================*/

type PhotoWindow = {
  fadeInStart: number;
  holdStart: number;
  holdEnd: number;
  fadeOutEnd: number;
};

function photoVisibility(progress: number, w: PhotoWindow) {
  if (progress < w.fadeInStart || progress > w.fadeOutEnd) return 0;
  if (progress < w.holdStart) {
    return (progress - w.fadeInStart) / (w.holdStart - w.fadeInStart);
  }
  if (progress <= w.holdEnd) return 1;
  return 1 - (progress - w.holdEnd) / (w.fadeOutEnd - w.holdEnd);
}

export default function NeuralNetworkSection() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const photo1Ref = useRef<HTMLDivElement | null>(null);
  const photo2Ref = useRef<HTMLDivElement | null>(null);
  const durationRef = useRef(0);
  const pendingRef = useRef(0);
  const seekingRef = useRef(false);
  const { ref: lazyRef, hasBeenInView } = useInView<HTMLDivElement>({ rootMargin: "400px" });

  // Seeking a video is async (decode to nearest keyframe). Chase only the
  // latest target instead of queuing every scroll-tick seek, or fast
  // scrolling backs up and playback lags behind the scrollbar.
  function trySeek() {
    const video = videoRef.current;
    if (!video) return;
    const target = pendingRef.current;
    if (Math.abs(video.currentTime - target) < 0.03) return;
    seekingRef.current = true;
    video.currentTime = target;
  }

  useEffect(() => {
    const video = videoRef.current;
    if (!hasBeenInView || !video || video.dataset.armed === "true") return;
    video.preload = "auto";
    video.src = VIDEO_SRC;
    video.load();
    video.dataset.armed = "true";
  }, [hasBeenInView]);

  useEffect(() => {
    if (!outerRef.current || !pinnedRef.current) return;

    const node1Window: PhotoWindow = {
      fadeInStart: NODE_1_FADE_IN_START,
      holdStart: NODE_1_HOLD_START,
      holdEnd: NODE_1_HOLD_END,
      fadeOutEnd: NODE_1_FADE_OUT_END,
    };
    const node2Window: PhotoWindow = {
      fadeInStart: NODE_2_FADE_IN_START,
      holdStart: NODE_2_HOLD_START,
      holdEnd: NODE_2_HOLD_END,
      fadeOutEnd: NODE_2_FADE_OUT_END,
    };

    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: pinnedRef.current,
      // Kept low and paired with the short-GOP video above so the camera
      // tracks the scrollbar directly instead of visibly catching up.
      scrub: 0.15,
      onUpdate: (self) => {
        const progress = self.progress;

        // Drive the camera: scroll position maps directly to the clip's
        // playhead, same seek-chasing approach as the CinematicReel.
        const video = videoRef.current;
        const duration = durationRef.current;
        if (video && video.dataset.armed === "true" && duration > 0 && video.readyState >= 1) {
          pendingRef.current = progress * duration;
          if (!seekingRef.current) trySeek();
        }

        applyPhotoTransform(photo1Ref.current, photoVisibility(progress, node1Window));
        applyPhotoTransform(photo2Ref.current, photoVisibility(progress, node2Window));
      },
    });

    return () => st.kill();
  }, []);

  return (
    <div
      ref={outerRef}
      id="neural"
      className="relative"
      style={{ height: `${SCROLL_DISTANCE_VH}vh` }}
    >
      <div ref={lazyRef} className="absolute inset-0 pointer-events-none" aria-hidden />

      <div ref={pinnedRef} className="relative h-screen w-full overflow-hidden bg-void">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            durationRef.current = e.currentTarget.duration || 0;
            // Playback is entirely scroll-driven from here - the camera
            // only moves when the user scrolls.
            e.currentTarget.pause();
          }}
          onSeeked={() => {
            seekingRef.current = false;
            trySeek();
          }}
          className="absolute inset-0 z-[1] h-full w-full object-cover"
        />

        <div className="vignette z-[2]" />

        <NodePhoto
          ref={photo1Ref}
          src={PHOTO_1_SRC}
          alt={PHOTO_1_CAPTION.title}
          eyebrow={PHOTO_1_CAPTION.eyebrow}
          title={PHOTO_1_CAPTION.title}
        />
        <NodePhoto
          ref={photo2Ref}
          src={PHOTO_2_SRC}
          alt={PHOTO_2_CAPTION.title}
          eyebrow={PHOTO_2_CAPTION.eyebrow}
          title={PHOTO_2_CAPTION.title}
        />
      </div>
    </div>
  );
}

function applyPhotoTransform(el: HTMLDivElement | null, visibility: number) {
  if (!el) return;
  const v = Math.min(1, Math.max(0, visibility));

  // Base reveal: grow in from 70% and drift up into place, mirrored on the
  // way out.
  const scale = 0.7 + v * 0.3;
  const driftPx = (1 - v) * 18;

  // A short-lived bloom that peaks mid-transition (v=0.5) and settles back
  // to nothing once fully shown/hidden - a soft flash as the photo
  // materializes out of the node's light, and dissolves back into it.
  const transitionPulse = v * (1 - v) * 4;
  const blurPx = (1 - v) * 10;
  const brightness = 1 + transitionPulse * 0.5;
  const glowRadius = 10 + transitionPulse * 26;
  const glowAlpha = 0.3 + transitionPulse * 0.45;

  el.style.opacity = String(v);
  el.style.transform = `translate(-50%, calc(-50% + ${driftPx}px)) scale(${scale})`;
  el.style.filter = `blur(${blurPx}px) brightness(${brightness}) drop-shadow(0 0 ${glowRadius}px rgba(233,201,138,${glowAlpha}))`;
  el.style.pointerEvents = v > 0.05 ? "auto" : "none";
}

const NodePhoto = forwardRef<HTMLDivElement, { src: string; alt: string; eyebrow: string; title: string }>(
  function NodePhoto({ src, alt, eyebrow, title }, ref) {
    return (
      <div
        ref={ref}
        className="absolute z-[3] will-change-[opacity,transform]"
        style={{
          left: `${NODE_SCREEN_POSITION.leftPercent}%`,
          top: `${NODE_SCREEN_POSITION.topPercent}%`,
          opacity: 0,
          transform: "translate(-50%, calc(-50% + 18px)) scale(0.7)",
          filter: "blur(10px) brightness(1)",
        }}
      >
        {/* Large enough to read clearly while still sitting inside node 1's
            hollow center (the tighter of the two nodes) - see the width
            clamp below. */}
        <div className="relative" style={{ width: "clamp(150px, 17vw, 260px)" }}>
          {/* the photo, contained inside the node's empty glowing center */}
          <div
            className="relative z-[3] overflow-hidden rounded-2xl border border-gold-dim/70"
            style={{
              aspectRatio: "4 / 3",
              boxShadow: "0 0 22px rgba(201,163,95,0.35), 0 0 60px rgba(201,163,95,0.18)",
            }}
          >
            <img src={src} alt={alt} draggable={false} className="h-full w-full object-cover" />
          </div>

          {/* soft screen-blend bloom, bleeding past the photo's edges so
              the video's own gold ring keeps reading through around it */}
          <div
            className="absolute z-[4] pointer-events-none rounded-full"
            style={{
              inset: "-20%",
              mixBlendMode: "screen",
              filter: "blur(3px)",
              background:
                "radial-gradient(circle, rgba(233,201,138,0.28) 0%, rgba(233,201,138,0.1) 45%, transparent 72%)",
            }}
          />

          <div className="relative z-[5] mt-4 flex flex-col items-center text-center">
            <span className="label-caps text-[9px] text-gold-bright/90">{eyebrow}</span>
            <span className="font-display text-sm text-bone/90 mt-0.5">{title}</span>
          </div>
        </div>
      </div>
    );
  }
);
