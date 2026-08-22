import { useEffect, useRef, useState } from "react";
import { THEMES, THEME_CONNECTIONS } from "../data/hackathon";
import SectionHeading from "./SectionHeading";
import ThemeModal from "./ThemeModal";
import { useHackathonState } from "../hooks/useHackathonState";

// Detect mobile (touch) once on mount
function useIsMobile() {
  const ref = useRef(
    typeof window !== "undefined" &&
      ("ontouchstart" in window || window.innerWidth <= 768)
  );
  return ref.current;
}

// The first theme is the top vertex (y=14). Its label should appear
// ABOVE the node so it doesn't overlap the triangle edges. Other
// themes keep labels below.
function isTopVertex(theme: { y: number }) {
  return theme.y < 30;
}

export default function ThemeNetwork() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { problemStatementsVisible } = useHackathonState();
  const isMobile = useIsMobile();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const byId = Object.fromEntries(THEMES.map((t) => [t.id, t]));
  const activeTheme = activeId ? byId[activeId] : null;
  const openTheme = openId ? byId[openId] : null;

  function isConnected(id: string) {
    if (!activeId) return false;
    return THEME_CONNECTIONS.some(
      ([a, b]) => (a === activeId && b === id) || (b === activeId && a === id)
    );
  }

  function handleNodeClick(id: string) {
    if (isMobile) {
      if (activeId === id) {
        setOpenId(id);
        setActiveId(null);
      } else {
        setActiveId(id);
      }
    } else {
      setOpenId(id);
    }
  }

  return (
    <section id="themes" className="relative py-20 md:py-28 px-6 bg-void overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="THE CIRCUITRY"
          title="Themes"
          subtitle={
            isMobile
              ? "Tap a node to explore a track. Tap again to open."
              : "Three tracks, one network. Hover a node to trace its connections, click to open a track."
          }
        />

        <div className="flex justify-center -mt-6 mb-10">
          <span
            className={`label-caps text-[10px] flex items-center gap-2 rounded-full border px-4 py-2 ${
              problemStatementsVisible
                ? "border-gold-dim/60 text-gold-bright"
                : "border-line text-mist"
            }`}
          >
            {problemStatementsVisible ? "🔓 Problem Statements Revealed" : "🔒 Problem Statements Locked"}
          </span>
        </div>

        {/* ─── Triangle network diagram ─── */}
        <div
          className="relative w-full mx-auto"
          style={{ maxWidth: "800px", aspectRatio: "1 / 1", minHeight: "400px" }}
        >
          {/* SVG layer — triangle lines only, no animated dots */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full overflow-visible"
            style={{ zIndex: 0 }}
          >
            <defs>
              <filter id="gold-glow" x="-50" y="-50" width="200" height="200" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="dim-glow" x="-50" y="-50" width="200" height="200" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="0.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Connection lines */}
            {THEME_CONNECTIONS.map(([a, b], i) => {
              const from = byId[a];
              const to = byId[b];
              const lit = activeId === a || activeId === b;
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={lit ? "#c9a35f" : "#6b5837"}
                  strokeWidth={lit ? 5 : 4}
                  filter={lit ? "url(#gold-glow)" : "url(#dim-glow)"}
                  className="transition-all duration-500"
                  opacity={mounted ? 1 : 0}
                  style={{
                    transitionDelay: `${i * 120}ms`,
                  }}
                />
              );
            })}
          </svg>

          {/* Theme nodes */}
          {THEMES.map((theme, idx) => {
            const isActive = activeId === theme.id;
            const connected = isConnected(theme.id);
            const dimmed = activeId && !isActive && !connected;
            const top = isTopVertex(theme);

            return (
              <button
                key={theme.id}
                onMouseEnter={isMobile ? undefined : () => setActiveId(theme.id)}
                onMouseLeave={isMobile ? undefined : () => setActiveId(null)}
                onClick={() => handleNodeClick(theme.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group focus:outline-none"
                style={{
                  left: `${theme.x}%`,
                  top: `${theme.y}%`,
                  zIndex: 1,
                  opacity: mounted ? (dimmed ? 0.35 : 1) : 0,
                  transition: `opacity 0.4s ease ${idx * 150}ms`,
                }}
                aria-label={`Open ${theme.label} theme`}
              >
                {/* Outer pulse ring — only on active */}
                {isActive && (
                  <span
                    className="absolute rounded-full animate-ping"
                    style={{
                      width: "90px",
                      height: "90px",
                      background: "rgba(201,163,95,0.18)",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%,-50%)",
                      animationDuration: "1.6s",
                    }}
                  />
                )}

                {/* Main node circle */}
                <span
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: isActive ? "64px" : connected ? "48px" : "36px",
                    height: isActive ? "64px" : connected ? "48px" : "36px",
                    background: isActive
                      ? "radial-gradient(circle, #e9c98a 30%, #c9a35f 100%)"
                      : connected
                      ? "radial-gradient(circle, #c9a35f 30%, #8a7346 100%)"
                      : "radial-gradient(circle, #8a7346 20%, #3a3020 100%)",
                    boxShadow: isActive
                      ? "0 0 20px rgba(233,201,138,0.9), 0 0 40px rgba(201,163,95,0.45)"
                      : connected
                      ? "0 0 10px rgba(201,163,95,0.5)"
                      : "0 0 4px rgba(138,115,70,0.3)",
                  }}
                />

                {/* Label — top vertex gets label ABOVE the node, others below */}
                <span
                  className="absolute label-caps whitespace-nowrap transition-all duration-300"
                  style={{
                    ...(top
                      ? {
                          bottom: "calc(100% + 12px)",
                          top: "auto",
                        }
                      : {
                          top: "calc(100% + 10px)",
                        }),
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: isActive ? "16px" : "13px",
                    fontWeight: "bold",
                    letterSpacing: "0.18em",
                    color: isActive
                      ? "#e9c98a"
                      : dimmed
                      ? "rgba(169,164,154,0.35)"
                      : "#a9a49a",
                    textShadow: isActive
                      ? "0 0 12px rgba(233,201,138,0.5)"
                      : "none",
                  }}
                >
                  {theme.label}
                </span>

                {/* Mobile: tap hint */}
                {isMobile && isActive && (
                  <span
                    className="absolute label-caps text-[9px] text-cyan/70 whitespace-nowrap animate-fade-in"
                    style={{
                      ...(top
                        ? { bottom: "calc(100% + 30px)", top: "auto" }
                        : { bottom: "calc(100% + 8px)" }),
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  >
                    tap again to open
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Description panel */}
        <div className="mt-16 h-16 flex items-center justify-center text-center px-4">
          {activeTheme ? (
            <p className="text-bone text-sm md:text-base max-w-md animate-fade-in">
              <span className="text-gold-bright font-semibold">{activeTheme.label}. </span>
              {activeTheme.description}
            </p>
          ) : (
            <p className="text-mist text-sm">
              {isMobile ? "Tap a node to explore a track." : "Hover or tap a node to explore a track."}
            </p>
          )}
        </div>
      </div>

      {openTheme && (
        <ThemeModal
          theme={openTheme}
          revealed={problemStatementsVisible}
          onClose={() => setOpenId(null)}
        />
      )}
    </section>
  );
}
