import { EVENT } from "../data/hackathon";

export default function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink px-6 py-10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-mist text-xs">
          © 2026 {EVENT.name} {EVENT.edition} · All rights reserved
        </p>
        <p className="text-mist text-xs flex items-center gap-1.5">
          Crafted with
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("open-admin"))}
            aria-label="heart"
            className="inline-flex hover:scale-125 transition-transform"
          >
            ❤️
          </button>
          by the NeuraX Team
        </p>
      </div>
    </footer>
  );
}
