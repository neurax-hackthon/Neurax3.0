import { useEffect, useRef, useState } from "react";
import { useCountdown } from "../hooks/useCountdown";
import { EVENT } from "../data/hackathon";

type Props = {
  onEnter: () => void;
};

const REVEAL_DELAYS = [0.2, 0.32, 0.44, 0.56, 0.68, 0.8];
const EXIT_MS = 700;

export default function IntroScreen({ onEnter }: Props) {
  const countdown = useCountdown(EVENT.countdownTarget);
  const [exiting, setExiting] = useState(false);
  const enteredRef = useRef(false);

  // The exit relies on a plain CSS transition + setTimeout rather than a JS
  // animation-frame ticker (gsap, rAF), so it can never get stuck if the tab
  // loses focus or the browser throttles rendering mid-animation — the
  // timeout fires on the JS event loop regardless of paint/rAF state.
  function handleEnter() {
    if (enteredRef.current) return;
    enteredRef.current = true;
    setExiting(true);
    setTimeout(onEnter, EXIT_MS);
  }

  useEffect(() => {
    if (countdown.done) handleEnter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown.done]);

  return (
    <div
      onClick={handleEnter}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-void cursor-pointer select-none overflow-hidden transition-opacity ease-in-out ${
        exiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{ transitionDuration: `${EXIT_MS}ms` }}
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-dim/20 animate-pulse-slow" />
        <div className="absolute left-1/2 top-1/2 h-[38vmax] w-[38vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-dim/20" />
        <div className="absolute left-1/2 top-1/2 h-[18vmax] w-[18vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <span
          className="intro-reveal opacity-0 animate-fade-in label-caps text-xs md:text-sm text-cyan mb-6"
          style={{ animationDelay: `${REVEAL_DELAYS[0]}s` }}
        >
          A COMPETITIVE HACKATHON EXPERIENCE
        </span>

        <h1
          className="intro-reveal opacity-0 animate-fade-in font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tight text-bone leading-none"
          style={{ animationDelay: `${REVEAL_DELAYS[1]}s` }}
        >
          NEURA<span className="text-gold-bright">X</span>
        </h1>
        <p
          className="intro-reveal opacity-0 animate-fade-in label-caps text-sm md:text-base text-gold mt-4 tracking-[0.5em]"
          style={{ animationDelay: `${REVEAL_DELAYS[2]}s` }}
        >
          {EVENT.edition}
        </p>

        <div
          className="intro-reveal opacity-0 animate-fade-in mt-14 flex items-center gap-4 md:gap-8"
          style={{ animationDelay: `${REVEAL_DELAYS[3]}s` }}
        >
          <TimeBlock value={countdown.hours} label="HRS" />
          <Colon />
          <TimeBlock value={countdown.minutes} label="MIN" />
          <Colon />
          <TimeBlock value={countdown.seconds} label="SEC" />
        </div>

        <p
          className="intro-reveal opacity-0 animate-fade-in mt-10 text-mist text-xs md:text-sm"
          style={{ animationDelay: `${REVEAL_DELAYS[4]}s` }}
        >
          {EVENT.dateLabel} &middot; {EVENT.venue}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleEnter();
          }}
          className="intro-reveal opacity-0 animate-fade-in mt-16 label-caps text-[11px] md:text-xs text-mist hover:text-gold-bright transition-colors border border-line hover:border-gold-dim rounded-full px-6 py-3"
          style={{ animationDelay: `${REVEAL_DELAYS[5]}s` }}
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl md:text-6xl text-bone tabular-nums">{value}</span>
      <span className="label-caps text-[10px] text-mist mt-1">{label}</span>
    </div>
  );
}

function Colon() {
  return <span className="font-display text-3xl md:text-5xl text-gold-dim -mt-4">:</span>;
}
