import { useEffect, useState } from "react";

const DURATION_MS = 24 * 60 * 60 * 1000;

export type LaunchCountdown = {
  hours: string;
  minutes: string;
  seconds: string;
  finished: boolean;
};

function pad(n: number) {
  return Math.max(0, n).toString().padStart(2, "0");
}

// Ticks down from launchTime + 24h. `launchTime` is a shared server-resolved
// timestamp (ms), so every client counts down from the same instant — there
// is no per-client "start my own 24 hours" behavior.
export function useLaunchCountdown(launchTime: number): LaunchCountdown {
  const endTime = launchTime > 0 ? launchTime + DURATION_MS : 0;
  const [remaining, setRemaining] = useState(() => (endTime > 0 ? endTime - Date.now() : 0));

  useEffect(() => {
    if (endTime <= 0) {
      setRemaining(0);
      return;
    }
    const tick = () => setRemaining(endTime - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);

  const clamped = Math.max(0, remaining);
  const totalSeconds = Math.floor(clamped / 1000);

  return {
    hours: pad(Math.floor(totalSeconds / 3600)),
    minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
    seconds: pad(totalSeconds % 60),
    finished: endTime > 0 && clamped <= 0,
  };
}
