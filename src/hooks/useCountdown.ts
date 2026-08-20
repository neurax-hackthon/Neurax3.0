import { useEffect, useState } from "react";

export type CountdownParts = {
  hours: string;
  minutes: string;
  seconds: string;
  done: boolean;
};

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

export function useCountdown(targetIso: string): CountdownParts {
  const [remaining, setRemaining] = useState(() => new Date(targetIso).getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(new Date(targetIso).getTime() - Date.now());
    }, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  const clamped = Math.max(0, remaining);
  const totalSeconds = Math.floor(clamped / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: pad(hours),
    minutes: pad(minutes),
    seconds: pad(seconds),
    done: clamped <= 0,
  };
}
