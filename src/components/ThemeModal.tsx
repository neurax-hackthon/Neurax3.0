import { useEffect } from "react";
import type { Theme } from "../data/hackathon";

type Props = {
  theme: Theme;
  revealed: boolean;
  onClose: () => void;
};

export default function ThemeModal({ theme, revealed, onClose }: Props) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const ps = theme.problemStatement;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-void/80 backdrop-blur-sm px-4 py-10 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl border border-line bg-charcoal px-7 py-8 md:px-9 md:py-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 h-9 w-9 flex items-center justify-center rounded-full border border-line text-mist hover:text-bone hover:border-gold-dim transition-colors"
        >
          ✕
        </button>

        <span className="text-4xl">{theme.icon}</span>
        <h3 className="font-display text-2xl md:text-3xl text-bone mt-4">{theme.label}</h3>
        <p className="text-mist text-sm md:text-base mt-2 leading-relaxed">{theme.description}</p>

        <div className="flex flex-wrap gap-2 mt-5">
          {theme.tags.map((tag) => (
            <span
              key={tag}
              className="label-caps text-[10px] text-gold-dim border border-line rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-8 pt-7 border-t border-line">
          {theme.comingSoon ? (
            <div className="flex flex-col items-center text-center py-6">
              <span className="text-3xl">❔</span>
              <p className="label-caps text-xs md:text-sm text-cyan mt-4">Track Coming Soon</p>
              <p className="text-mist text-sm mt-3 max-w-xs">
                This track hasn't been finalized yet. Check back soon for details.
              </p>
            </div>
          ) : !revealed ? (
            <div className="flex flex-col items-center text-center py-6">
              <span className="text-3xl">🔒</span>
              <p className="label-caps text-xs md:text-sm text-gold-bright mt-4">
                Problem Statement Locked
              </p>
              <p className="text-mist text-sm mt-3 max-w-xs">
                The detailed challenge for this track will be revealed by the organizers.
                Stay tuned.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6 animate-fade-in">
              <div>
                <span className="label-caps text-[10px] text-cyan">{ps.code} · Problem Statement</span>
                <p className="text-bone text-sm md:text-base leading-relaxed mt-2">{ps.summary}</p>
              </div>

              <div>
                <span className="label-caps text-[10px] text-cyan">Objectives</span>
                <ul className="flex flex-col gap-2 mt-2">
                  {ps.objectives.map((o) => (
                    <li key={o} className="flex gap-3 text-mist text-sm leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {o}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="label-caps text-[10px] text-cyan">Requirements</span>
                <ul className="flex flex-col gap-2 mt-2">
                  {ps.requirements.map((r) => (
                    <li key={r} className="flex gap-3 text-mist text-sm leading-relaxed">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
