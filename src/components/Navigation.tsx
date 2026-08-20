import { useState } from "react";
import { NAV_LINKS } from "../data/hackathon";
import { useActiveSection } from "../hooks/useActiveSection";
import { scrollToTarget } from "../lib/gsap";

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
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget(0);
          }}
          className="font-display text-lg tracking-wide text-bone"
        >
          NEURA<span className="text-gold-bright">X</span>
        </a>

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

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSfELUvKrZS2koDgq92jZzjzFqanV5jiS5AjghIE2gXNMFVygA/viewform?usp=send_form"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex label-caps text-[10px] px-4 py-2 rounded-full bg-gold-bright text-void font-semibold hover:bg-bone transition-colors"
        >
          Register Now
        </a>

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
            href="https://docs.google.com/forms/d/e/1FAIpQLSfELUvKrZS2koDgq92jZzjzFqanV5jiS5AjghIE2gXNMFVygA/viewform?usp=send_form"
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
