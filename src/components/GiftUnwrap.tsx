import { useState, useCallback, useEffect } from "react";

/**
 * GiftUnwrap — a fullscreen gift box inauguration animation.
 *
 * The gift appears wrapped with a ribbon. On press (Enter / tap),
 * the ribbon flies off, the lid lifts, and a golden glow reveals
 * a personalized message inside.
 *
 * Usage: render <GiftUnwrap /> as a route or overlay.
 * To dismiss after reveal, the user taps anywhere or presses Enter again.
 */

type Phase = "wrapped" | "unwrapping" | "revealed";

type Props = {
  /** Recipient name */
  recipientName?: string;
  /** Title inside the gift */
  revealTitle?: string;
  /** Subtitle / message inside the gift */
  revealMessage?: string;
  /** Called when the user dismisses the revealed state */
  onDismiss?: () => void;
};

export default function GiftUnwrap({
  recipientName = "Respected Director",
  revealTitle = "NeuraX 3.0",
  revealMessage = "With gratitude and respect,\nthe NeuraX Team invites you\nto inaugurate HACKATHON 3.0",
  onDismiss,
}: Props) {
  const [phase, setPhase] = useState<Phase>("wrapped");

  const advance = useCallback(() => {
    setPhase((prev) => {
      if (prev === "wrapped") return "unwrapping";
      if (prev === "unwrapping") return "revealed";
      if (prev === "revealed" && onDismiss) onDismiss();
      return prev;
    });
  }, [onDismiss]);

  // After unwrapping starts, auto-advance to revealed after 1.8s
  useEffect(() => {
    if (phase === "unwrapping") {
      const t = setTimeout(() => setPhase("revealed"), 1800);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // Key / tap listener
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        advance();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advance]);

  const isWrapped = phase === "wrapped";
  const isUnwrapping = phase === "unwrapping";
  const isRevealed = phase === "revealed";

  return (
    <div
      onClick={advance}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
      style={{
        background: isRevealed
          ? "radial-gradient(ellipse at center, #1a1408 0%, #060506 80%)"
          : "radial-gradient(ellipse at center, #0d0b08 0%, #060506 80%)",
        transition: "background 1s ease",
      }}
    >
      {/* Ambient particles */}
      {isRevealed && <Particles />}

      {/* Gift scene */}
      <div
        className="relative flex flex-col items-center"
        style={{ perspective: "1200px" }}
      >
        {/* ─── Gift box body ─── */}
        <div
          className="relative"
          style={{
            width: "min(320px, 80vw)",
            height: "min(260px, 65vw)",
          }}
        >
          {/* Box base */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "60%",
              borderRadius: "8px",
              background: "linear-gradient(145deg, #2a1f10, #1a140a)",
              border: "1px solid rgba(201,163,95,0.25)",
              boxShadow:
                "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(201,163,95,0.1)",
              transition: "box-shadow 1s ease",
              ...(isRevealed && {
                boxShadow:
                  "0 8px 40px rgba(201,163,95,0.2), 0 0 80px rgba(233,201,138,0.15), inset 0 1px 0 rgba(201,163,95,0.2)",
              }),
            }}
          >
            {/* Vertical ribbon on box */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "28px",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(90deg, #c9a35f 0%, #e9c98a 50%, #c9a35f 100%)",
                opacity: isUnwrapping || isRevealed ? 0 : 0.9,
                transition: "opacity 0.6s ease",
              }}
            />

            {/* Inner glow when revealed */}
            {isRevealed && (
              <div
                style={{
                  position: "absolute",
                  inset: "8px",
                  borderRadius: "4px",
                  background:
                    "radial-gradient(ellipse at center, rgba(233,201,138,0.12) 0%, transparent 70%)",
                  animation: "pulse-slow 3s ease-in-out infinite",
                }}
              />
            )}
          </div>

          {/* ─── Lid ─── */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "-4%",
              right: "-4%",
              height: "42%",
              borderRadius: "8px 8px 4px 4px",
              background: "linear-gradient(145deg, #342710, #1e1608)",
              border: "1px solid rgba(201,163,95,0.3)",
              boxShadow:
                "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(233,201,138,0.15)",
              transformOrigin: "top center",
              transition: "transform 1.2s cubic-bezier(0.25,0.1,0.25,1), opacity 0.8s ease",
              ...(isUnwrapping || isRevealed
                ? {
                    transform: "rotateX(-110deg) translateY(-30px)",
                    opacity: isRevealed ? 0 : 0.7,
                  }
                : {
                    transform: "rotateX(0deg)",
                  }),
            }}
          >
            {/* Horizontal ribbon on lid */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                right: 0,
                height: "28px",
                transform: "translateY(-50%)",
                background:
                  "linear-gradient(180deg, #c9a35f 0%, #e9c98a 50%, #c9a35f 100%)",
                opacity: isUnwrapping || isRevealed ? 0 : 0.9,
                transition: "opacity 0.5s ease",
              }}
            />

            {/* Vertical ribbon on lid */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: "28px",
                transform: "translateX(-50%)",
                background:
                  "linear-gradient(90deg, #c9a35f 0%, #e9c98a 50%, #c9a35f 100%)",
                opacity: isUnwrapping || isRevealed ? 0 : 0.9,
                transition: "opacity 0.5s ease",
              }}
            />

            {/* Ribbon bow */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) scale(${isUnwrapping || isRevealed ? 2 : 1})`,
                opacity: isUnwrapping || isRevealed ? 0 : 1,
                transition: "all 0.8s cubic-bezier(0.25,0.1,0.25,1)",
                fontSize: "36px",
                filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.4))",
              }}
            >
              🎀
            </div>
          </div>

          {/* ─── Revealed content inside the box ─── */}
          <div
            style={{
              position: "absolute",
              bottom: "8%",
              left: "8%",
              right: "8%",
              top: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            }}
          >
            <span
              style={{
                fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                fontSize: "clamp(28px, 7vw, 44px)",
                fontWeight: 700,
                color: "#e9c98a",
                lineHeight: 1.1,
                textShadow: "0 0 30px rgba(233,201,138,0.5)",
              }}
            >
              {revealTitle}
            </span>
            <span
              style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontSize: "10px",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#c9a35f",
                marginTop: "8px",
                fontWeight: 600,
              }}
            >
              HACKATHON 3.0
            </span>
          </div>
        </div>
      </div>

      {/* ─── Text content below the box ─── */}
      <div
        className="flex flex-col items-center text-center mt-10 px-6"
        style={{
          opacity: isRevealed ? 1 : isWrapped ? 1 : 0.3,
          transition: "opacity 0.8s ease 0.5s",
        }}
      >
        {isWrapped && (
          <>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                fontSize: "clamp(18px, 5vw, 26px)",
                color: "#f2ede3",
                fontWeight: 500,
                marginBottom: "6px",
              }}
            >
              Dear {recipientName}
            </p>
            <p
              style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontSize: "13px",
                color: "#a9a49a",
                marginBottom: "28px",
              }}
            >
              A token of gratitude awaits you
            </p>
            <div
              className="animate-pulse"
              style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#c9a35f",
                padding: "10px 24px",
                border: "1px solid rgba(201,163,95,0.3)",
                borderRadius: "999px",
              }}
            >
              Press Enter or Tap to Unwrap
            </div>
          </>
        )}

        {isRevealed && (
          <div
            style={{
              opacity: 1,
              animation: "fade-in 1s ease forwards",
            }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', 'Times New Roman', serif",
                fontSize: "clamp(16px, 4vw, 22px)",
                color: "#f2ede3",
                fontWeight: 500,
                whiteSpace: "pre-line",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              {revealMessage}
            </p>
            <p
              style={{
                fontFamily: "'Manrope', system-ui, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#6fd8d1",
              }}
            >
              September 19–20, 2026 · CMR Technical Campus
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* Floating golden particles that appear on reveal */
function Particles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${3 + (i % 4) * 2}px`,
            height: `${3 + (i % 4) * 2}px`,
            borderRadius: "50%",
            background:
              i % 3 === 0
                ? "#e9c98a"
                : i % 3 === 1
                ? "#c9a35f"
                : "#6fd8d1",
            left: `${5 + (i * 5.2) % 90}%`,
            bottom: "-10px",
            opacity: 0.6 + (i % 3) * 0.15,
            animation: `particle-rise ${3 + (i % 5) * 0.8}s ease-out ${i * 0.15}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
