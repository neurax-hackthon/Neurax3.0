// ─── AdminPanel ──────────────────────────────────────────────────────────────
// The "control center" behind the hidden heart in the footer. Every action
// here writes to the shared Firestore doc — nothing is local-only state, so
// every connected client sees the change in realtime. Actual authorization is
// enforced by Firestore Security Rules (see firestore.rules); ADMIN_EMAILS is
// only used here to decide what UI to show a signed-in user.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { ADMIN_EMAILS } from "../config/admin";
import { useHackathonState } from "../hooks/useHackathonState";
import { useLaunchCountdown } from "../hooks/useLaunchCountdown";

const HACKATHON_REF = () => doc(db, "neurax3", "hackathon");

export default function AdminPanel() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }
    window.addEventListener("open-admin", handleOpen);
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
    return () => {
      window.removeEventListener("open-admin", handleOpen);
      unsub();
    };
  }, []);

  if (!open) return null;

  const isAdmin = !!user && !!user.email && ADMIN_EMAILS.includes(user.email);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-void/85 backdrop-blur-sm px-4 py-10 animate-fade-in"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl border border-line bg-charcoal px-7 py-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <span className="label-caps text-xs text-gold-bright">⚙ NeurAX Control Center</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="h-8 w-8 flex items-center justify-center rounded-full border border-line text-mist hover:text-bone hover:border-gold-dim transition-colors"
          >
            ✕
          </button>
        </div>

        {!authReady ? (
          <p className="text-mist text-sm text-center py-8">Loading…</p>
        ) : !user ? (
          <LoginForm />
        ) : !isAdmin ? (
          <NotAuthorized email={user.email} />
        ) : (
          <Dashboard email={user.email} />
        )}
      </div>
    </div>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="label-caps text-[10px] text-mist mb-1">Admin Login</p>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
        className="rounded-lg border border-line bg-ink px-4 py-2.5 text-sm text-bone placeholder:text-mist/60 focus:outline-none focus:border-gold-dim"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
        className="rounded-lg border border-line bg-ink px-4 py-2.5 text-sm text-bone placeholder:text-mist/60 focus:outline-none focus:border-gold-dim"
      />
      {error && <p className="text-cyan text-xs">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 label-caps text-[11px] rounded-full bg-gold-bright text-void font-semibold py-3 hover:bg-bone transition-colors disabled:opacity-60"
      >
        {loading ? "Signing In…" : "Sign In →"}
      </button>
    </form>
  );
}

function NotAuthorized({ email }: { email: string | null }) {
  return (
    <div className="flex flex-col items-center text-center gap-3 py-4">
      <p className="text-mist text-sm">⛔ Not authorized as admin.</p>
      <p className="text-mist text-xs">{email}</p>
      <button
        type="button"
        onClick={() => signOut(auth)}
        className="label-caps text-[10px] text-mist hover:text-bone border border-line rounded-full px-5 py-2 transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}

function Dashboard({ email }: { email: string | null }) {
  const { launched, launchTime, problemStatementsVisible, customMessage, loading } = useHackathonState();
  const countdown = useLaunchCountdown(launchTime);

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [confirmReveal, setConfirmReveal] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [message, setMessage] = useState(customMessage);

  const finished = launched && countdown.finished;

  async function handleStart() {
    setBusy(true);
    setError("");
    try {
      await setDoc(HACKATHON_REF(), { launched: true, launchTime: serverTimestamp() }, { merge: true });
    } catch {
      setError("Launch failed. Check Firestore permissions.");
    } finally {
      setBusy(false);
    }
  }

  async function handleReveal() {
    if (!confirmReveal) {
      setConfirmReveal(true);
      return;
    }
    setBusy(true);
    setError("");
    try {
      await setDoc(HACKATHON_REF(), { problemStatementsVisible: true }, { merge: true });
      setConfirmReveal(false);
    } catch {
      setError("Reveal failed. Check Firestore permissions.");
    } finally {
      setBusy(false);
    }
  }

  async function handleBroadcast() {
    setBusy(true);
    setError("");
    try {
      await setDoc(HACKATHON_REF(), { customMessage: message }, { merge: true });
    } catch {
      setError("Broadcast failed.");
    } finally {
      setBusy(false);
    }
  }

  async function handleReset() {
    if (!confirmReset) {
      setConfirmReset(true);
      return;
    }
    setBusy(true);
    setError("");
    try {
      await setDoc(
        HACKATHON_REF(),
        { launched: false, launchTime: 0, problemStatementsVisible: false, customMessage: "" },
        { merge: true }
      );
      setConfirmReset(false);
      setMessage("");
    } catch {
      setError("Reset failed. Check Firestore permissions.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="label-caps text-[10px] text-mist">Admin</p>
        <p className="text-bone text-sm mt-0.5">{email}</p>
      </div>

      {loading ? (
        <p className="text-mist text-sm">Loading state…</p>
      ) : (
        <>
          {/* Hackathon status */}
          <div>
            <p className="label-caps text-[10px] text-mist mb-2">Hackathon</p>
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`h-2 w-2 rounded-full ${
                  finished ? "bg-mist" : launched ? "bg-cyan animate-pulse-slow" : "bg-gold-dim"
                }`}
              />
              <span className="label-caps text-[11px] text-bone">
                {finished ? "Finished" : launched ? "Live" : "Not Started"}
              </span>
            </div>

            {launched && !finished && (
              <p className="font-display text-2xl text-gold-bright tabular-nums mb-3">
                {countdown.hours}:{countdown.minutes}:{countdown.seconds}
              </p>
            )}

            {!launched && (
              <button
                type="button"
                onClick={handleStart}
                disabled={busy}
                className="w-full label-caps text-[11px] rounded-full bg-gold-bright text-void font-semibold py-3 hover:bg-bone transition-colors disabled:opacity-60"
              >
                {busy ? "Launching…" : "🚀 Start Hackathon"}
              </button>
            )}
          </div>

          <div className="h-px bg-line" />

          {/* Problem statements */}
          <div>
            <p className="label-caps text-[10px] text-mist mb-2">Problem Statements</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">{problemStatementsVisible ? "🔓" : "🔒"}</span>
              <span className="label-caps text-[11px] text-bone">
                {problemStatementsVisible ? "Revealed" : "Locked"}
              </span>
            </div>

            {!problemStatementsVisible &&
              (!confirmReveal ? (
                <button
                  type="button"
                  onClick={handleReveal}
                  disabled={busy}
                  className="w-full label-caps text-[11px] rounded-full border border-cyan-dim text-cyan py-3 hover:bg-cyan-dim/10 transition-colors disabled:opacity-60"
                >
                  🔓 Reveal Problem Statements
                </button>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-mist text-xs">
                    This makes the detailed problem statements visible to every participant. Sure?
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleReveal}
                      disabled={busy}
                      className="flex-1 label-caps text-[10px] rounded-full bg-cyan text-void font-semibold py-2.5 disabled:opacity-60"
                    >
                      {busy ? "Revealing…" : "✓ Reveal"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmReveal(false)}
                      className="flex-1 label-caps text-[10px] rounded-full border border-line text-mist py-2.5"
                    >
                      ✕ Cancel
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="h-px bg-line" />

          {/* Broadcast */}
          <div>
            <p className="label-caps text-[10px] text-mist mb-2">Broadcast Message</p>
            <div className="flex flex-col gap-2">
              <input
                type="text"
                placeholder="e.g. Checkpoint: go grab dinner!"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="rounded-lg border border-line bg-ink px-4 py-2.5 text-sm text-bone placeholder:text-mist/60 focus:outline-none focus:border-gold-dim"
              />
              <button
                type="button"
                onClick={handleBroadcast}
                disabled={busy}
                className="label-caps text-[10px] rounded-full border border-line text-mist hover:text-bone hover:border-gold-dim py-2.5 transition-colors disabled:opacity-60"
              >
                📢 Broadcast
              </button>
            </div>
          </div>

          <div className="h-px bg-line" />

          {/* Reset */}
          <div>
            {!confirmReset ? (
              <button
                type="button"
                onClick={handleReset}
                disabled={busy}
                className="w-full label-caps text-[10px] text-mist hover:text-gold-bright border border-line hover:border-gold-dim rounded-full py-2.5 transition-colors disabled:opacity-60"
              >
                🔄 Reset Hackathon
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-mist text-xs">
                  ⚠️ This stops the live timer and re-locks problem statements for everyone. Sure?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    disabled={busy}
                    className="flex-1 label-caps text-[10px] rounded-full bg-gold-dim text-void font-semibold py-2.5 disabled:opacity-60"
                  >
                    {busy ? "Resetting…" : "✓ Yes, Reset"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmReset(false)}
                    className="flex-1 label-caps text-[10px] rounded-full border border-line text-mist py-2.5"
                  >
                    ✕ Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {error && <p className="text-cyan text-xs">{error}</p>}

      <button
        type="button"
        onClick={() => signOut(auth)}
        className="label-caps text-[10px] text-mist hover:text-bone transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
