import { useState } from "react";
import { THEMES, THEME_CONNECTIONS } from "../data/hackathon";
import SectionHeading from "./SectionHeading";
import ThemeModal from "./ThemeModal";
import { useHackathonState } from "../hooks/useHackathonState";

export default function ThemeNetwork() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const { problemStatementsVisible } = useHackathonState();

  const byId = Object.fromEntries(THEMES.map((t) => [t.id, t]));
  const activeTheme = activeId ? byId[activeId] : null;
  const openTheme = openId ? byId[openId] : null;

  function isConnected(id: string) {
    if (!activeId) return false;
    return THEME_CONNECTIONS.some(
      ([a, b]) => (a === activeId && b === id) || (b === activeId && a === id)
    );
  }

  return (
    <section id="themes" className="relative py-20 md:py-28 px-6 bg-void overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="THE CIRCUITRY"
          title="Themes"
          subtitle="Three tracks, one network. Hover a node to trace its connections, tap to open a track."
        />

        <div className="flex justify-center -mt-6 mb-8">
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

        <div className="relative w-full aspect-square max-w-md mx-auto min-h-[260px] md:min-h-[340px]">
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
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
                  stroke={lit ? "#c9a35f" : "#26221d"}
                  strokeWidth={lit ? 0.5 : 0.3}
                  className="transition-all duration-300"
                  style={lit ? { filter: "drop-shadow(0 0 2px rgba(201,163,95,0.6))" } : undefined}
                />
              );
            })}
          </svg>

          {THEMES.map((theme) => {
            const isActive = activeId === theme.id;
            const connected = isConnected(theme.id);
            const dimmed = activeId && !isActive && !connected;
            return (
              <button
                key={theme.id}
                onMouseEnter={() => setActiveId(theme.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setOpenId(theme.id)}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group"
                style={{ left: `${theme.x}%`, top: `${theme.y}%` }}
              >
                <span
                  className={`rounded-full transition-all duration-300 ${
                    isActive
                      ? "h-4 w-4 bg-gold-bright shadow-[0_0_16px_rgba(233,201,138,0.9)]"
                      : connected
                      ? "h-3 w-3 bg-gold"
                      : "h-2.5 w-2.5 bg-gold-dim"
                  } ${dimmed ? "opacity-30" : "opacity-100"}`}
                />
                <span
                  className={`label-caps mt-2 text-[9px] md:text-[10px] whitespace-nowrap transition-colors duration-300 ${
                    isActive ? "text-gold-bright" : dimmed ? "text-mist/40" : "text-mist"
                  }`}
                >
                  {theme.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 h-14 flex items-center justify-center text-center px-4">
          {activeTheme ? (
            <p className="text-bone text-sm md:text-base max-w-md animate-fade-in">
              <span className="text-gold-bright font-medium">{activeTheme.label}.</span>{" "}
              {activeTheme.description}
            </p>
          ) : (
            <p className="text-mist text-sm">Hover or tap a node to explore a track.</p>
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
