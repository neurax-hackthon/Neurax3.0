import { useEffect } from "react";
import { ScrollTrigger } from "../lib/gsap";
import { useHackathonState } from "../hooks/useHackathonState";
import { useLaunchCountdown } from "../hooks/useLaunchCountdown";

// Renders nothing until the admin starts the hackathon — driven entirely by
// the shared Firestore state, so every connected client flips to LIVE at the
// same instant with no reload.
export default function LiveTimer() {
  const { launched, launchTime, customMessage } = useHackathonState();
  const countdown = useLaunchCountdown(launchTime);

  // This section mounts/unmounts right below the pinned NeuralNetworkSection,
  // shifting the scroll-trigger positions of everything further down the
  // page. A refresh here keeps those triggers (and ScrollProgress) accurate
  // instead of firing at a stale offset.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [launched]);

  if (!launched) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-28 bg-void border-b border-line overflow-hidden">
      <div className="absolute inset-0 opacity-40">
        <div className="absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {!countdown.finished ? (
          <>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-dim/60 px-5 py-2 mb-7">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan animate-pulse-slow" />
              <span className="label-caps text-xs md:text-sm text-cyan">Live Now</span>
            </span>

            <h2 className="font-display text-3xl md:text-5xl text-bone">
              NEURA<span className="text-gold-bright">X</span> 3.0
            </h2>
            <p className="label-caps text-xs md:text-sm text-gold mt-3 tracking-[0.4em]">
              24-Hour Hackathon
            </p>

            <div className="mt-12 flex items-center gap-3 md:gap-6">
              <TimeBlock value={countdown.hours} label="HRS" />
              <Colon />
              <TimeBlock value={countdown.minutes} label="MIN" />
              <Colon />
              <TimeBlock value={countdown.seconds} label="SEC" />
            </div>

            <p className="label-caps text-[10px] md:text-xs text-mist mt-8">
              Remaining to code &amp; conquer
            </p>
          </>
        ) : (
          <>
            <span className="label-caps text-xs md:text-sm text-gold-dim mb-5">
              24 Hours Complete
            </span>
            <h2 className="font-display text-4xl md:text-6xl text-bone">Hackathon Finished</h2>
            <p className="text-mist text-sm md:text-base mt-4">Thank you for building with us.</p>
          </>
        )}

        {customMessage && (
          <div className="mt-10 inline-flex flex-col items-center gap-1.5 rounded-2xl border border-cyan-dim/50 bg-charcoal/60 px-7 py-5">
            <span className="label-caps text-[10px] text-cyan">📢 Broadcast</span>
            <span className="text-bone text-base md:text-lg">{customMessage}</span>
          </div>
        )}
      </div>
    </section>
  );
}

function TimeBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="flex items-center justify-center rounded-2xl border border-line bg-charcoal/80"
        style={{
          width: "clamp(84px, 15vw, 160px)",
          height: "clamp(94px, 17vw, 172px)",
        }}
      >
        <span
          className="font-sans font-medium text-bone tabular-nums leading-none"
          style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
        >
          {value}
        </span>
      </div>
      <span className="label-caps text-[10px] md:text-xs text-mist">{label}</span>
    </div>
  );
}

function Colon() {
  return (
    <span
      className="font-sans font-medium text-gold-dim self-center opacity-60"
      style={{ fontSize: "clamp(2rem, 5vw, 4rem)", marginTop: "-1.5rem" }}
    >
      :
    </span>
  );
}
