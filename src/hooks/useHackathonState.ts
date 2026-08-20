// ─── useHackathonState ──────────────────────────────────────────────────────
// Single centralized realtime Firestore listener for the NeuraX 3.0 shared
// hackathon state. Every component that needs launched/timer/reveal state
// should call this hook — it is cheap to call multiple times (React shares
// nothing here, but Firestore's SDK dedupes identical onSnapshot listeners
// under the hood), so there is no need to lift it into context.
//
// `launchTime` is resolved from a Firestore server timestamp rather than the
// admin's local clock, so the 24-hour countdown stays correct even if the
// admin's device clock is wrong.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";

export const HACKATHON_DOC_PATH = "neurax3/hackathon" as const;

export type HackathonState = {
  launched: boolean;
  launchTime: number;
  problemStatementsVisible: boolean;
  customMessage: string;
  loading: boolean;
};

const DEFAULTS: Omit<HackathonState, "loading"> = {
  launched: false,
  launchTime: 0,
  problemStatementsVisible: false,
  customMessage: "",
};

function toMillis(value: unknown): number {
  if (value instanceof Timestamp) return value.toMillis();
  if (typeof value === "number") return value;
  return 0;
}

export function useHackathonState(): HackathonState {
  const [state, setState] = useState<Omit<HackathonState, "loading">>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ref = doc(db, "neurax3", "hackathon");

    const unsub = onSnapshot(
      ref,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setState({
            launched: data.launched ?? false,
            launchTime: toMillis(data.launchTime),
            problemStatementsVisible: data.problemStatementsVisible ?? false,
            customMessage: data.customMessage ?? "",
          });
        } else {
          setState(DEFAULTS);
          setDoc(ref, DEFAULTS).catch(() => {
            // No write permission yet (rules not deployed) — site still works read-only.
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error("[useHackathonState] Firestore error:", error);
        setState(DEFAULTS);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return { ...state, loading };
}
