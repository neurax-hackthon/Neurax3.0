import { forwardRef, useEffect, useRef } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { useInView } from "../hooks/useInView";

/* ============================================================================
 * DESKTOP — scroll-scrubbed cinematic video (unchanged)
 * MOBILE  — lightweight CSS animated "Neural Legacy" section (no video, no pin)
 * ==========================================================================*/

const PHOTO_1_SRC = "/images/neurax-1.0.jpg";
const PHOTO_2_SRC = "/images/neurax-2.0.jpg";
const PHOTO_1_CAPTION = { eyebrow: "SEPTEMBER 2025", title: "NeuraX 1.0" };
const PHOTO_2_CAPTION = { eyebrow: "FEBRUARY 2026", title: "NeuraX 2.0" };

const NODE_SCREEN_POSITION = { leftPercent: 50, topPercent: 50 };

const NODE_1_FADE_IN_START = 0.32;
const NODE_1_HOLD_START = 0.37;
const NODE_1_HOLD_END = 0.4;
const NODE_1_FADE_OUT_END = 0.47;

const NODE_2_FADE_IN_START = 0.57;
const NODE_2_HOLD_START = 0.67;
const NODE_2_HOLD_END = 0.79;
const NODE_2_FADE_OUT_END = 0.87;

const SCROLL_DISTANCE_VH = 480;

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
  // Detect mobile once on mount
  const isMobile =
    typeof window !== "undefined" && window.innerWidth <= 768;

  if (isMobile) {
    return <MobileLegacySection />;
  }

  return <DesktopVideoSection />;
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* DESKTOP — exactly as before                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

function DesktopVideoSection() {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const pinnedRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const photo1Ref = useRef<HTMLDivElement | null>(null);
  const photo2Ref = useRef<HTMLDivElement | null>(null);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const { ref: lazyRef, hasBeenInView } = useInView<HTMLDivElement>({ rootMargin: "400px" });

  useEffect(() => {
    if (!hasBeenInView) return;
    if (imagesRef.current.length > 0) return; // already loaded

    const loadImages = async () => {
      const promises = [];
      for (let i = 1; i <= 240; i++) {
        promises.push(
          new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = `/videos/frames/frame_${i.toString().padStart(4, '0')}.jpg`;
            img.onload = () => resolve(img);
            img.onerror = () => reject();
          })
        );
      }
      
      try {
        const loadedImages = await Promise.all(promises);
        imagesRef.current = loadedImages;

        // Draw first frame immediately
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx && loadedImages[0]) {
           canvas.width = 1280;
           canvas.height = 720;
           ctx.drawImage(loadedImages[0], 0, 0, canvas.width, canvas.height);
        }
      } catch (e) {
        console.error("Failed to load image sequence", e);
      }
    };

    loadImages();
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
      scrub: true, // Native 1:1 instant scroll scrub
      onUpdate: (self) => {
        driveFrame(self.progress, node1Window, node2Window);
      },
    });

    return () => {
      st.kill();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function driveFrame(progress: number, n1: PhotoWindow, n2: PhotoWindow) {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const images = imagesRef.current;
    
    if (canvas && ctx && images.length === 240) {
      // map progress (0-1) to frame index (0-239)
      const frameIndex = Math.min(239, Math.max(0, Math.floor(progress * 239)));
      ctx.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
    }

    applyPhotoTransform(photo1Ref.current, photoVisibility(progress, n1));
    applyPhotoTransform(photo2Ref.current, photoVisibility(progress, n2));
  }

  return (
    <div
      ref={outerRef}
      id="neural"
      className="relative"
      style={{ height: `${SCROLL_DISTANCE_VH}vh` }}
    >
      <div ref={lazyRef} className="absolute inset-0 pointer-events-none" aria-hidden />

      <div ref={pinnedRef} className="relative h-screen w-full overflow-hidden bg-void">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 z-[1] h-full w-full object-cover will-change-transform"
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

/* ─────────────────────────────────────────────────────────────────────────── */
/* MOBILE — lightweight "Neural Legacy" timeline, zero video, zero pin        */
/* Uses CSS scroll-reveal via IntersectionObserver + pure CSS animations.     */
/* ─────────────────────────────────────────────────────────────────────────── */

function MobileLegacySection() {
  return (
    <section id="neural" className="relative bg-void py-20 px-5 overflow-hidden">
      {/* Ambient background glow — pure CSS, zero JS cost */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(201,163,95,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Animated SVG neural net backdrop — lightweight, CSS-driven */}
      <NeuralBackdropSVG />

      <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center gap-16">
        {/* Section label */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="label-caps text-[11px] text-cyan tracking-[0.28em]">
            NEURAL LEGACY
          </span>
          <h2 className="font-display text-4xl font-semibold text-bone leading-tight">
            Where It All Began
          </h2>
          <p className="text-mist text-sm leading-relaxed max-w-xs">
            Two editions. Hundreds of builders. One evolving network.
          </p>
        </div>

        {/* Edition cards — IntersectionObserver reveal */}
        <RevealCard
          photo={PHOTO_1_SRC}
          eyebrow={PHOTO_1_CAPTION.eyebrow}
          title={PHOTO_1_CAPTION.title}
          edition="1.0"
          participants="420"
          projects="86"
          champion="Team Axiom"
          delay={0}
        />

        {/* Connector line between cards */}
        <div className="relative flex flex-col items-center gap-1 -my-4">
          <div className="w-px h-10 bg-gradient-to-b from-gold-dim/60 to-transparent" />
          <span className="label-caps text-[9px] text-gold-dim/60 tracking-widest">THEN</span>
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-gold-dim/60" />
        </div>

        <RevealCard
          photo={PHOTO_2_SRC}
          eyebrow={PHOTO_2_CAPTION.eyebrow}
          title={PHOTO_2_CAPTION.title}
          edition="2.0"
          participants="610"
          projects="134"
          champion="Team Lumen"
          delay={150}
        />

        {/* "Now" indicator pointing forward */}
        <div className="flex flex-col items-center gap-3 -mt-4">
          <div className="w-px h-10 bg-gradient-to-b from-gold-dim/60 to-transparent" />
          <div
            className="flex items-center gap-3 rounded-full border border-gold-dim/40 bg-gold/5 px-5 py-2.5"
          >
            <span
              className="inline-block h-2 w-2 rounded-full bg-gold-bright"
              style={{ animation: "pulse-slow 2s ease-in-out infinite" }}
            />
            <span className="label-caps text-[11px] text-gold-bright tracking-[0.2em]">
              NeuraX 3.0 — Sep 19–20, 2026
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Single edition card with IntersectionObserver scroll reveal */
function RevealCard({
  photo,
  eyebrow,
  title,
  edition,
  participants,
  projects,
  champion,
  delay,
}: {
  photo: string;
  eyebrow: string;
  title: string;
  edition: string;
  participants: string;
  projects: string;
  champion: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0) scale(1)";
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(28px) scale(0.97)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
      }}
      className="w-full rounded-3xl border border-line/70 bg-charcoal/40 overflow-hidden"
    >
      {/* Edition badge */}
      <div className="relative">
        <img
          src={photo}
          alt={title}
          className="w-full object-cover"
          style={{ aspectRatio: "16/9" }}
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(6,5,6,0.85) 0%, rgba(6,5,6,0.2) 50%, transparent 100%)",
          }}
        />
        {/* Bottom-left caption */}
        <div className="absolute bottom-4 left-5 flex flex-col gap-0.5">
          <span className="label-caps text-[9px] text-gold-bright/80">{eyebrow}</span>
          <span className="font-display text-2xl font-bold text-bone leading-none">{title}</span>
        </div>
        {/* Edition number — top-right */}
        <div className="absolute top-3 right-4">
          <span className="font-display text-4xl font-semibold text-white/10 leading-none select-none">
            {edition}
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 divide-x divide-line/50 px-0 py-4">
        <Stat value={participants} label="Participants" />
        <Stat value={projects} label="Projects" />
        <Stat value={champion} label="Champion" isText />
      </div>
    </div>
  );
}

function Stat({
  value,
  label,
  isText = false,
}: {
  value: string;
  label: string;
  isText?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1 py-1">
      <span
        className={
          isText
            ? "text-bone text-xs font-semibold text-center px-2 leading-tight"
            : "font-display text-2xl font-semibold text-gold-bright"
        }
      >
        {value}
      </span>
      <span className="label-caps text-[8px] text-mist tracking-[0.2em]">{label}</span>
    </div>
  );
}

/* Pure CSS/SVG animated neural network background — zero JS per-frame cost */
function NeuralBackdropSVG() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 w-full h-full z-0"
      viewBox="0 0 400 800"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity: 0.18 }}
    >
      {/* Static node dots */}
      {[
        [60, 120], [340, 80], [200, 250], [80, 400], [320, 420],
        [150, 580], [270, 620], [50, 700], [360, 680],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="#c9a35f"
          style={{
            animation: `pulse-slow ${2.5 + (i % 3) * 0.8}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Connection lines */}
      {[
        [60, 120, 200, 250],
        [340, 80, 200, 250],
        [200, 250, 80, 400],
        [200, 250, 320, 420],
        [80, 400, 150, 580],
        [320, 420, 270, 620],
        [150, 580, 270, 620],
        [270, 620, 360, 680],
        [150, 580, 50, 700],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#c9a35f"
          strokeWidth="0.6"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */
/* Desktop helpers (unchanged)                                                 */
/* ─────────────────────────────────────────────────────────────────────────── */

function applyPhotoTransform(el: HTMLDivElement | null, visibility: number) {
  if (!el) return;
  const v = Math.min(1, Math.max(0, visibility));
  const scale = 0.85 + v * 0.15;
  const driftPx = (1 - v) * 25;

  el.style.opacity = String(v);
  // Hardware accelerated 3D transform with no CPU calculation overhead
  el.style.transform = `translate3d(-50%, calc(-50% + ${driftPx}px), 0) scale3d(${scale}, ${scale}, 1)`;
  el.style.pointerEvents = v > 0.05 ? "auto" : "none";

  // Removed dynamic JS filter (blur/brightness) that causes massive composite lag on scroll
  el.style.filter = "none";
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
          transform: "translate3d(-50%, calc(-50% + 25px), 0) scale3d(0.85, 0.85, 1)",
          filter: "none",
        }}
      >
        <div className="relative w-[300px] md:w-[clamp(300px,34vw,520px)]">
          <div
            className="relative z-[3] overflow-hidden rounded-2xl border border-gold-dim/70"
            style={{
              aspectRatio: "4 / 3",
              boxShadow: "0 0 22px rgba(201,163,95,0.35), 0 0 60px rgba(201,163,95,0.18)",
            }}
          >
            <img src={src} alt={alt} draggable={false} className="h-full w-full object-cover" />
          </div>

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
