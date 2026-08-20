import { SECTIONS } from "../data/sections";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToTarget } from "../lib/gsap";

export default function ScrollProgress() {
  const active = useActiveSection();
  const activeIndex = SECTIONS.findIndex((s) => s.id === active);

  return (
    <div className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-0">
      {SECTIONS.map((section, i) => {
        const isActive = i === activeIndex;
        const isPast = i < activeIndex;
        return (
          <div key={section.id} className="flex flex-col items-center group">
            <button
              aria-label={`Go to ${section.label}`}
              onClick={() => scrollToTarget(`#${section.id}`)}
              className="relative flex items-center justify-center w-5 h-5"
            >
              <span
                className={`rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-2.5 w-2.5 bg-gold-bright shadow-[0_0_8px_rgba(233,201,138,0.7)]"
                    : isPast
                    ? "h-1.5 w-1.5 bg-gold-dim"
                    : "h-1.5 w-1.5 bg-line"
                }`}
              />
              <span className="pointer-events-none absolute right-6 whitespace-nowrap label-caps text-[10px] text-mist opacity-0 group-hover:opacity-100 transition-opacity">
                {section.label}
              </span>
            </button>
            {i < SECTIONS.length - 1 && (
              <span className={`h-6 w-px ${isPast ? "bg-gold-dim/60" : "bg-line"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
