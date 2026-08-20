import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { useInView } from "../hooks/useInView";

type ClipConfig = {
  src: string;
  eyebrow: string;
  headline: string;
  subtext: string;
};

// The "-scrub" files are re-encoded copies of the original clips with a much
// shorter keyframe interval (every 6 frames instead of every ~120). Scroll
// scrubbing seeks to arbitrary timestamps constantly, and without frequent
// keyframes the browser has to decode forward a long way on every seek,
// which is what caused the stutter. Same footage, just seek-friendly.
const CLIPS: ClipConfig[] = [
  {
    src: "/videos/clip1-scrub.mp4",
    eyebrow: "ORIGIN",
    headline: "EVERY GREAT IDEA STARTS WITH A CONNECTION.",
    subtext: "Deep inside the human mind, billions of neurons wait to fire.",
  },
  {
    src: "/videos/clip2-scrub.mp4",
    eyebrow: "IMPULSE",
    headline: "A SINGLE SIGNAL CAN CHANGE EVERYTHING.",
    subtext: "Electricity becomes thought. Thought becomes action.",
  },
  {
    src: "/videos/clip3-scrub.mp4",
    eyebrow: "NETWORK",
    headline: "ALONE, A NEURON IS SILENT. CONNECTED, IT BUILDS WORLDS.",
    subtext: "This is where NeurAX begins.",
  },
];

const OVERLAP = 0.22;

function bandOpacity(progress: number, index: number, count: number, overlap: number) {
  const start = index;
  const end = index + 1;
  const fadeInStart = index === 0 ? -Infinity : start - overlap;
  const fadeInEnd = start + overlap;
  const fadeOutStart = end - overlap;
  const fadeOutEnd = index === count - 1 ? Infinity : end + overlap;

  if (progress < fadeInStart) return 0;
  if (progress < fadeInEnd) return (progress - fadeInStart) / (fadeInEnd - fadeInStart);
  if (progress < fadeOutStart) return 1;
  if (progress < fadeOutEnd) return 1 - (progress - fadeOutStart) / (fadeOutEnd - fadeOutStart);
  return 0;
}

function textOpacity(progress: number, index: number) {
  const center = index + 0.5;
  const dist = Math.abs(progress - center);
  // visible for the middle ~0.5 of each clip's band, soft edges
  const visible = 0.34;
  const fade = 0.16;
  if (dist < visible) return 1;
  if (dist < visible + fade) return 1 - (dist - visible) / fade;
  return 0;
}

export default function CinematicReel() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const durationsRef = useRef<number[]>(CLIPS.map(() => 0));
  const pendingRef = useRef<number[]>(CLIPS.map(() => 0));
  const seekingRef = useRef<boolean[]>(CLIPS.map(() => false));
  const { ref: lazyRef, hasBeenInView } = useInView<HTMLDivElement>({ rootMargin: "400px" });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (hasBeenInView) setReady(true);
  }, [hasBeenInView]);

  // Seeking a compressed video is async (decode to the nearest keyframe).
  // If we blindly assign currentTime on every scroll tick, fast scrolling
  // queues up seeks faster than the browser can resolve them, so playback
  // only "catches up" once scrolling stops. Instead we track one pending
  // target per clip and only ever chase the latest one: a seek is issued,
  // and the next seek (to whatever the freshest target is by then) fires
  // only once the browser's `seeked` event confirms the previous one landed.
  function trySeek(i: number) {
    const video = videoRefs.current[i];
    if (!video) return;
    const target = pendingRef.current[i];
    if (Math.abs(video.currentTime - target) < 0.03) return;
    seekingRef.current[i] = true;
    video.currentTime = target;
  }

  useEffect(() => {
    if (!outerRef.current || !pinnedRef.current) return;

    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: pinnedRef.current,
      scrub: 0.8,
      onUpdate: (self) => {
        const progress = self.progress * CLIPS.length;
        CLIPS.forEach((_, i) => {
          const op = bandOpacity(progress, i, CLIPS.length, OVERLAP);
          const layer = layerRefs.current[i];
          if (layer) layer.style.opacity = op.toString();

          // Scroll scrubs the actual footage: the clip's playhead is driven
          // directly by how far the user has scrolled through its band.
          // Only clips that are actually visible get seeked, so the decoder
          // isn't fighting to scrub three videos at once.
          const video = videoRefs.current[i];
          const duration = durationsRef.current[i];
          if (op > 0.01 && video && video.dataset.armed === "true" && duration > 0 && video.readyState >= 1) {
            const local = Math.min(1, Math.max(0, progress - i));
            pendingRef.current[i] = local * duration;
            if (!seekingRef.current[i]) trySeek(i);
          }

          const text = textRefs.current[i];
          if (text) {
            const top = textOpacity(progress, i);
            text.style.opacity = top.toString();
            text.style.transform = `translateY(${(1 - top) * 14}px)`;
          }
        });
      },
    });

    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!ready) return;
    videoRefs.current.forEach((v, i) => {
      if (v && v.dataset.armed !== "true") {
        v.preload = "auto";
        v.src = CLIPS[i].src;
        v.load();
        v.dataset.armed = "true";
        v.pause();
      }
    });
  }, [ready]);

  return (
    <div ref={outerRef} className="relative" style={{ height: `${CLIPS.length * 100}vh` }}>
      <div ref={lazyRef} className="absolute inset-0 pointer-events-none" aria-hidden />
      <div ref={pinnedRef} className="relative h-screen w-full overflow-hidden bg-void">
        {CLIPS.map((clip, i) => (
          <div
            key={clip.src}
            ref={(el) => { layerRefs.current[i] = el; }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <video
              ref={(el) => { videoRefs.current[i] = el; }}
              muted
              playsInline
              preload={i === 0 ? "auto" : "none"}
              onLoadedMetadata={(e) => {
                durationsRef.current[i] = e.currentTarget.duration || 0;
                e.currentTarget.pause();
              }}
              onSeeked={() => {
                seekingRef.current[i] = false;
                trySeek(i);
              }}
              className="h-full w-full object-cover"
              poster=""
            />
            <div className="vignette" />
          </div>
        ))}

        {CLIPS.map((clip, i) => (
          <div
            key={`text-${clip.src}`}
            ref={(el) => { textRefs.current[i] = el; }}
            className="absolute inset-0 flex flex-col items-center justify-end pb-24 md:pb-32 px-6 text-center"
            style={{ opacity: i === 0 ? 1 : 0, transition: "opacity 0.1s linear" }}
          >
            <span className="label-caps text-[11px] md:text-xs text-cyan mb-4">{clip.eyebrow}</span>
            <h2 className="font-display text-balance text-3xl md:text-5xl lg:text-6xl font-medium text-bone max-w-4xl leading-[1.1]">
              {clip.headline}
            </h2>
            <p className="mt-5 text-mist text-sm md:text-base max-w-md">{clip.subtext}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
