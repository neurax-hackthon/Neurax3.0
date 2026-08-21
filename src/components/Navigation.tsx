import { useState } from "react";
import { NAV_LINKS } from "../data/hackathon";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToTarget } from "../lib/gsap";

// Simple SVG logo mark — a hexagonal node shape in NeuraX gold.
// Replace with an actual <img src="/logo.svg" /> when an asset is ready.
function LogoMark({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      {/* Outer hexagon ring */}
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        stroke="#c9a35f"
        strokeWidth="1.5"
        fill="none"
        opacity="0.8"
      />
      {/* Inner node dot */}
      <circle cx="16" cy="16" r="4" fill="#e9c98a" />
      {/* Neural connection lines */}
      <line x1="16" y1="12" x2="16" y2="2" stroke="#c9a35f" strokeWidth="1" opacity="0.5" />
      <line x1="16" y1="20" x2="16" y2="30" stroke="#c9a35f" strokeWidth="1" opacity="0.5" />
      <line x1="12.5" y1="14" x2="4" y2="9" stroke="#c9a35f" strokeWidth="1" opacity="0.5" />
      <line x1="19.5" y1="14" x2="28" y2="9" stroke="#c9a35f" strokeWidth="1" opacity="0.5" />
      <line x1="12.5" y1="18" x2="4" y2="23" stroke="#c9a35f" strokeWidth="1" opacity="0.5" />
      <line x1="19.5" y1="18" x2="28" y2="23" stroke="#c9a35f" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const active = useActiveSection();

  function go(href: string) {
    setOpen(false);
    scrollToTarget(href);
  }

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-3xl">
      <div className="flex items-center justify-between rounded-full border border-line/80 bg-void/60 backdrop-blur-md px-5 py-2.5">
        {/* Brand — logo + wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(0);
          }}
          className="flex items-center gap-2.5 group"
          aria-label="NeuraX — back to top"
        >
          <LogoMark size={26} />
          <span className="font-display text-[1.6rem] font-bold tracking-wide text-bone leading-none">
            Neura<span className="text-gold-bright">X</span>
          </span>
        </a>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = active === id;
            return (
              <li key={link.href}>
                <button
                  onClick={() => go(link.href)}
                  className={`label-caps text-[11px] transition-colors ${
                    isActive ? "text-gold-bright" : "text-mist hover:text-bone"
                  }`}
                >
                  {link.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <a
          href="https://forms.gle/RCSs4ajT6XzV2evJA"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex label-caps text-[10px] px-4 py-2 rounded-full bg-gold-bright text-void font-semibold hover:bg-bone transition-colors"
        >
          Register Now
        </a>

        {/* Hamburger */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden flex flex-col gap-1.5 p-1"
        >
          <span className={`block h-px w-5 bg-bone transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`block h-px w-5 bg-bone transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden mt-2 rounded-2xl border border-line/80 bg-ink/95 backdrop-blur-md px-5 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => go(link.href)}
              className="label-caps text-xs text-mist hover:text-gold-bright text-left"
            >
              {link.label}
            </button>
          ))}
          <a
            href="https://forms.gle/RCSs4ajT6XzV2evJA"
            target="_blank"
            rel="noreferrer"
            className="label-caps text-xs px-5 py-3 rounded-full bg-gold-bright text-void font-semibold text-center"
          >
            Register Now
          </a>
        </div>
      )}
    </nav>
  );
}
