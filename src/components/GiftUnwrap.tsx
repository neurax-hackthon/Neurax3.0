import { useState, useCallback, useEffect, useRef } from "react";

/**
 * Curtain Raiser — a fullscreen inauguration animation.
 *
 * Phase 1 ("ribbon"): Two luxurious curtains cover the screen with a golden
 *   ribbon stretched across the centre. The user can cut the ribbon by dragging
 *   their mouse/finger across it OR pressing Enter.
 *
 * Phase 2 ("cutting"): The ribbon snaps and falls away (0.8s).
 *
 * Phase 3 ("opening"): The curtains slowly gather and slide apart with
 *   realistic rounded fabric bunching, revealing the IntroScreen behind them.
 *   Confetti / flakes rain down. After 5 seconds the overlay auto-dismisses.
 */

type Phase = "ribbon" | "cutting" | "opening" | "opened";

type Props = {
  recipientName?: string;
  revealTitle?: string;
  revealMessage?: string;
  onDismiss?: () => void;
};

export default function GiftUnwrap({ onDismiss }: Props) {
  const [phase, setPhase] = useState<Phase>("ribbon");
  const [cutProgress, setCutProgress] = useState(0); // 0-1 visual feedback

  const cutRibbon = useCallback(() => {
    setPhase((prev) => (prev === "ribbon" ? "cutting" : prev));
  }, []);

  // After ribbon is cut, start opening curtains
  useEffect(() => {
    if (phase === "cutting") {
      const t = setTimeout(() => setPhase("opening"), 800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // After curtains finish opening, dismiss after 5s total
  useEffect(() => {
    if (phase === "opening") {
      const t = setTimeout(() => {
        setPhase("opened");
        if (onDismiss) onDismiss();
      }, 5000);
      return () => clearTimeout(t);
    }
  }, [phase, onDismiss]);

  // Keyboard listener — Enter or Space to cut
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.key === "Enter" || e.key === " ") && phase === "ribbon") {
        e.preventDefault();
        cutRibbon();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cutRibbon, phase]);

  /* ── Desktop: mousedown → mousemove → mouseup on the whole window ── */
  useEffect(() => {
    if (phase !== "ribbon") return;

    let startX: number | null = null;
    let startY: number | null = null;
    const RIBBON_ZONE = 120; // px from centre — generous hit zone
    const CUT_DISTANCE = 60; // px horizontal drag to cut

    function isInRibbonZone(y: number) {
      const centre = window.innerHeight / 2;
      return Math.abs(y - centre) < RIBBON_ZONE;
    }

    function onMouseDown(e: MouseEvent) {
      if (!isInRibbonZone(e.clientY)) return;
      startX = e.clientX;
      startY = e.clientY;
    }

    function onMouseMove(e: MouseEvent) {
      if (startX === null) return;
      const dx = Math.abs(e.clientX - startX);
      setCutProgress(Math.min(dx / CUT_DISTANCE, 1));
      if (dx >= CUT_DISTANCE) {
        startX = null;
        startY = null;
        setCutProgress(0);
        cutRibbon();
      }
    }

    function onMouseUp() {
      startX = null;
      startY = null;
      setCutProgress(0);
    }

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [phase, cutRibbon]);

  /* ── Mobile: any swipe or tap anywhere on screen cuts the ribbon ── */
  useEffect(() => {
    if (phase !== "ribbon") return;

    let startX: number | null = null;
    let didSwipe = false;
    const CUT_DISTANCE = 30; // px — very low threshold for touch swipe

    function onTouchStart(e: TouchEvent) {
      const touch = e.touches[0];
      startX = touch.clientX;
      didSwipe = false;
      // Prevent browser from stealing the touch for scroll/navigation
      e.preventDefault();
    }

    function onTouchMove(e: TouchEvent) {
      if (startX === null) return;
      const touch = e.touches[0];
      const dx = Math.abs(touch.clientX - startX);
      setCutProgress(Math.min(dx / CUT_DISTANCE, 1));
      if (dx >= CUT_DISTANCE) {
        didSwipe = true;
        startX = null;
        setCutProgress(0);
        cutRibbon();
      }
      e.preventDefault();
    }

    function onTouchEnd(e: TouchEvent) {
      // If the user tapped without swiping, also cut the ribbon
      if (!didSwipe && startX !== null) {
        cutRibbon();
      }
      startX = null;
      didSwipe = false;
      setCutProgress(0);
      e.preventDefault();
    }

    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [phase, cutRibbon]);

  const showRibbon = phase === "ribbon";
  const isOpening = phase === "opening" || phase === "opened";
  const ribbonCut = phase !== "ribbon";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center select-none overflow-hidden"
      style={{ cursor: showRibbon ? "crosshair" : "default", touchAction: "none" }}
    >
      {/* ─── Top Valance (theatre pelmet) ─── */}
      <div
        className="absolute top-0 left-0 right-0 z-40"
        style={{
          height: "clamp(60px, 10vh, 100px)",
          background: "linear-gradient(to bottom, #480000, #300000 60%, #200000)",
          borderBottom: "5px solid #d4af37",
          boxShadow: "0 8px 40px rgba(0,0,0,0.9), 0 4px 12px rgba(212,175,55,0.15)",
          opacity: isOpening ? 0 : 1,
          transition: "opacity 2s ease 3s",
        }}
      >
        {/* Scalloped drape pattern */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "20px",
            background:
              "repeating-conic-gradient(#480000 0% 25%, transparent 0% 50%) 0 0 / 40px 20px",
            opacity: 0.5,
          }}
        />
      </div>

      {/* ─── Left Curtain ─── */}
      <div
        className="absolute top-0 left-0 bottom-0 z-30"
        style={{
          width: isOpening ? "0%" : "50%",
          transition: "width 4.5s cubic-bezier(0.22, 0.8, 0.36, 1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: "50vw", // keep content full half-width so the fabric compresses
            background: `
              linear-gradient(90deg,
                #3a0000 0%, #5a0000 8%, #3a0000 16%,
                #5a0000 24%, #3a0000 32%, #520000 40%,
                #3a0000 48%, #5a0000 56%, #3a0000 64%,
                #520000 72%, #3a0000 80%, #5a0000 88%,
                #4a0000 100%)`,
            boxShadow:
              "inset -30px 0 60px rgba(0,0,0,0.7), 15px 0 50px rgba(0,0,0,0.9)",
            borderRight: isOpening ? "5px solid #d4af37" : "none",
            // Rounded gathering on the inner edge
            borderTopRightRadius: isOpening ? "40% 15%" : "0",
            borderBottomRightRadius: isOpening ? "40% 15%" : "0",
            transition:
              "border-top-right-radius 4.5s ease, border-bottom-right-radius 4.5s ease",
          }}
        >
          {/* Vertical fabric fold lines */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent, transparent 25px, rgba(0,0,0,0.3) 26px, transparent 28px)",
              opacity: 0.6,
            }}
          />
          {/* Sheen highlight */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, transparent 30%, rgba(255,200,200,0.06) 45%, transparent 55%)",
            }}
          />
        </div>
      </div>

      {/* ─── Right Curtain ─── */}
      <div
        className="absolute top-0 right-0 bottom-0 z-30"
        style={{
          width: isOpening ? "0%" : "50%",
          transition: "width 4.5s cubic-bezier(0.22, 0.8, 0.36, 1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            width: "50vw",
            background: `
              linear-gradient(-90deg,
                #3a0000 0%, #5a0000 8%, #3a0000 16%,
                #5a0000 24%, #3a0000 32%, #520000 40%,
                #3a0000 48%, #5a0000 56%, #3a0000 64%,
                #520000 72%, #3a0000 80%, #5a0000 88%,
                #4a0000 100%)`,
            boxShadow:
              "inset 30px 0 60px rgba(0,0,0,0.7), -15px 0 50px rgba(0,0,0,0.9)",
            borderLeft: isOpening ? "5px solid #d4af37" : "none",
            borderTopLeftRadius: isOpening ? "40% 15%" : "0",
            borderBottomLeftRadius: isOpening ? "40% 15%" : "0",
            transition:
              "border-top-left-radius 4.5s ease, border-bottom-left-radius 4.5s ease",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(-90deg, transparent, transparent 25px, rgba(0,0,0,0.3) 26px, transparent 28px)",
              opacity: 0.6,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(-120deg, transparent 30%, rgba(255,200,200,0.06) 45%, transparent 55%)",
            }}
          />
        </div>
      </div>

      {/* ─── Ribbon across the curtains ─── */}
      <div
        className="absolute z-40 flex items-center justify-center"
        style={{
          left: 0,
          right: 0,
          top: "50%",
          height: "120px",
          transform: "translateY(-50%)",
          pointerEvents: "none",
        }}
      >
        {/* Cut progress glow */}
        {showRibbon && cutProgress > 0 && (
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, rgba(255,215,0,${cutProgress * 0.4}) 0%, transparent 70%)`,
              transition: "background 0.05s",
            }}
          />
        )}
        {/* Ribbon left half */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: "50%",
            top: "50%",
            height: "36px",
            transform: ribbonCut
              ? "translateY(-50%) rotate(8deg) translateY(120vh)"
              : "translateY(-50%)",
            background:
              "linear-gradient(180deg, #d4af37 0%, #f5d76e 30%, #d4af37 60%, #b8941f 100%)",
            boxShadow:
              "0 2px 12px rgba(212,175,55,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
            transition: ribbonCut
              ? "transform 1s cubic-bezier(0.4, 0, 1, 1)"
              : "none",
            opacity: ribbonCut ? 0 : 1,
            transitionProperty: "transform, opacity",
            transitionDuration: "1s, 0.8s",
          }}
        />
        {/* Ribbon right half */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            right: 0,
            top: "50%",
            height: "36px",
            transform: ribbonCut
              ? "translateY(-50%) rotate(-8deg) translateY(120vh)"
              : "translateY(-50%)",
            background:
              "linear-gradient(180deg, #d4af37 0%, #f5d76e 30%, #d4af37 60%, #b8941f 100%)",
            boxShadow:
              "0 2px 12px rgba(212,175,55,0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
            transition: ribbonCut
              ? "transform 1s cubic-bezier(0.4, 0, 1, 1)"
              : "none",
            opacity: ribbonCut ? 0 : 1,
            transitionProperty: "transform, opacity",
            transitionDuration: "1s, 0.8s",
          }}
        />
        {/* Ribbon bow / centre knot */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            fontSize: "40px",
            filter: "drop-shadow(0 2px 10px rgba(0,0,0,0.5))",
            transform: ribbonCut ? "scale(2) rotate(20deg)" : "scale(1)",
            opacity: ribbonCut ? 0 : 1,
            transition: "all 0.6s ease",
          }}
        >
          🎀
        </div>
      </div>

      {/* ─── Scissors icon following mouse on ribbon ─── */}
      {showRibbon && <ScissorsHint />}

      {/* ─── Prompt text ─── */}
      <div
        className="absolute bottom-12 left-0 right-0 z-50 flex flex-col items-center pointer-events-none"
        style={{
          opacity: showRibbon ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <div
          className="animate-pulse-slow"
          style={{
            fontFamily: "'Manrope', system-ui, sans-serif",
            fontSize: "13px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#e9c98a",
            padding: "14px 28px",
            border: "1px solid rgba(201,163,95,0.4)",
            borderRadius: "999px",
            background: "rgba(6,5,6,0.85)",
            backdropFilter: "blur(6px)",
            boxShadow: "0 0 30px rgba(201,163,95,0.2)",
          }}
        >
          ✂️ Swipe across the ribbon or press Enter
        </div>
      </div>

      {/* ─── Confetti ─── */}
      {(phase === "opening" || phase === "opened") && <Confetti />}
    </div>
  );
}

/* ─── Scissors hint that follows mouse position on the ribbon area ─── */
function ScissorsHint() {
  const [pos, setPos] = useState({ x: 0, y: 0, visible: false });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      setPos({ x: e.clientX, y: e.clientY, visible: true });
    }
    function onLeave() {
      setPos((p) => ({ ...p, visible: false }));
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!pos.visible) return null;

  return (
    <div
      className="pointer-events-none fixed z-[200]"
      style={{
        left: pos.x - 16,
        top: pos.y - 16,
        fontSize: "28px",
        transform: "rotate(-45deg)",
        transition: "left 0.05s, top 0.05s",
        filter: "drop-shadow(0 0 6px rgba(212,175,55,0.6))",
      }}
    >
      ✂️
    </div>
  );
}

/* ─── Confetti (lots of falling flakes) ─── */
function Confetti() {
  // Pre-compute particles once to avoid re-renders changing them
  const particles = useRef(
    Array.from({ length: 300 }).map((_, i) => ({
      size: Math.random() * 10 + 4,
      color:
        i % 7 === 0
          ? "#6fd8d1"
          : i % 5 === 0
          ? "#f2ede3"
          : i % 3 === 0
          ? "#e9c98a"
          : i % 2 === 0
          ? "#c9a35f"
          : "#ffffff",
      left: Math.random() * 100,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2.5,
      rotation: Math.random() * 360,
      isCircle: Math.random() > 0.5,
      glow: Math.random() * 8 + 2,
      opacity: Math.random() * 0.6 + 0.4,
    }))
  ).current;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden z-20"
      aria-hidden
    >
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: p.isCircle ? "50%" : "2px",
            background: p.color,
            left: `${p.left}%`,
            top: "-20px",
            opacity: p.opacity,
            animation: `particle-fall ${p.duration}s linear ${p.delay}s infinite`,
            transform: `rotate(${p.rotation}deg)`,
            boxShadow: `0 0 ${p.glow}px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}
