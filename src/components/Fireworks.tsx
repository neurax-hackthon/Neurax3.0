// ─── Fireworks ────────────────────────────────────────────────────────────────
// Pure-canvas fireworks engine. Rockets launch from the bottom, travel upward
// with a glowing trail, explode radially. Sparkles twinkle across the full
// canvas throughout the show. Runs for `duration` ms then fades out.
// ─────────────────────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";

// Palette: gold, bright-gold, cyan, silver, white — matches site tokens
const PALETTES: string[][] = [
  ["#D4AF37", "#F5D76E", "#FFE680"],
  ["#00E5FF", "#40F0FF", "#B0F8FF"],
  ["#FFFFFF", "#D4AF37", "#F5D76E"],
  ["#00E5FF", "#FFFFFF", "#D4AF37"],
  ["#FFD700", "#FF8C00", "#FF6347"],
];

const SPARKLE_COLORS = ["#FFFFFF", "#F5D76E", "#D4AF37", "#00E5FF", "#B0F8FF", "#FFE680"];

// ── Types ─────────────────────────────────────────────────────────────────────

interface TrailPoint { x: number; y: number; }

interface Rocket {
  x: number; y: number;
  vx: number; vy: number;
  targetY: number;
  colors: string[];
  trail: TrailPoint[];
  exploded: boolean;
}

interface Spark {
  x: number; y: number;
  vx: number; vy: number;
  alpha: number;
  color: string;
  radius: number;
  decay: number;
  gravity: number;
}

/** A twinkling star-shaped sparkle fixed in space */
interface Sparkle {
  x: number;
  y: number;
  size: number;       // max arm length
  alpha: number;      // current alpha
  maxAlpha: number;   // peak alpha
  phase: number;      // current phase in lifecycle (0→1→0)
  speed: number;      // phase increment per frame
  color: string;
  rotation: number;   // fixed rotation angle
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function createSparks(x: number, y: number, colors: string[]): Spark[] {
  const count = Math.floor(randomBetween(90, 150));
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 + randomBetween(-0.15, 0.15);
    const speed = randomBetween(1.8, 7);
    return {
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: randomBetween(1.5, 3.2),
      decay: randomBetween(0.011, 0.021),
      gravity: randomBetween(0.035, 0.085),
    };
  });
}

function createRocket(canvasW: number, canvasH: number, burstY: number): Rocket {
  const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
  const x = randomBetween(canvasW * 0.1, canvasW * 0.9);
  const targetY = burstY + randomBetween(-canvasH * 0.12, canvasH * 0.12);
  const speed = randomBetween(13, 19);
  const vy = -speed; // always upward
  const vx = randomBetween(-1.5, 1.5);
  return { x, y: canvasH, vx, vy, targetY, colors: palette, trail: [], exploded: false };
}

function createSparkle(canvasW: number, canvasH: number): Sparkle {
  return {
    x: randomBetween(0, canvasW),
    y: randomBetween(0, canvasH),
    size: randomBetween(3, 9),
    alpha: 0,
    maxAlpha: randomBetween(0.5, 1.0),
    phase: 0,
    speed: randomBetween(0.012, 0.03),
    color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
    rotation: randomBetween(0, Math.PI / 4),
  };
}

/** Draw a 4-pointed star / cross sparkle */
function drawSparkle(ctx: CanvasRenderingContext2D, s: Sparkle) {
  const { x, y, size, rotation } = s;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);

  // Long thin cross
  for (let i = 0; i < 2; i++) {
    const angle = i * (Math.PI / 2);
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -size);
    ctx.lineTo(size * 0.08, -size * 0.35);
    ctx.lineTo(size * 0.08, size * 0.35);
    ctx.lineTo(0, size);
    ctx.lineTo(-size * 0.08, size * 0.35);
    ctx.lineTo(-size * 0.08, -size * 0.35);
    ctx.closePath();
    ctx.fillStyle = s.color;
    ctx.fill();
    ctx.restore();
  }

  // Centre glow dot
  const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.4);
  grd.addColorStop(0, "#ffffff");
  grd.addColorStop(1, s.color + "00");
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.4, 0, Math.PI * 2);
  ctx.fillStyle = grd;
  ctx.fill();

  ctx.restore();
}

// ── Component ─────────────────────────────────────────────────────────────────

interface FireworksProps {
  duration?: number;
  onDone?: () => void;
  burstZoneY?: number;
}

export default function Fireworks({ duration = 11000, onDone, burstZoneY = 0.38 }: FireworksProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Keep onDone in a ref so it never restarts the effect
  const onDoneRef = useRef(onDone);
  useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

  // Run exactly once on mount — one-shot animation
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    const rockets: Rocket[] = [];
    const sparks: Spark[] = [];
    const sparkles: Sparkle[] = [];

    let animId = 0;
    let stopped = false;
    let globalAlpha = 1;
    let startTime = 0;
    const fadeOutMs = 1800;
    let started = false;
    let frameCount = 0;

    // ── Start once canvas has real dimensions ──────────────────────────────────
    function start() {
      if (started || canvas!.width === 0 || canvas!.height === 0) return;
      started = true;
      startTime = performance.now();
      scheduleRockets();
      // Pre-populate some sparkles
      for (let i = 0; i < 30; i++) {
        const sp = createSparkle(canvas!.width, canvas!.height);
        sp.phase = Math.random(); // stagger initial phases
        sparkles.push(sp);
      }
      animId = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => { resize(); start(); });
    ro.observe(canvas);
    resize();
    start();

    // ── Rocket launch schedule ─────────────────────────────────────────────────
    function scheduleRockets() {
      // Opening volley
      [0, 300, 600].forEach((delay) => {
        setTimeout(() => {
          if (stopped || !canvas) return;
          rockets.push(createRocket(canvas.width, canvas.height, canvas.height * burstZoneY));
        }, delay);
      });
      // Sustained phase
      let t = 1000;
      while (t < duration - 2200) {
        const d = t;
        setTimeout(() => {
          if (stopped || !canvas) return;
          rockets.push(createRocket(canvas.width, canvas.height, canvas.height * burstZoneY));
        }, d);
        t += randomBetween(280, 600);
      }
      // Grand finale — 7 rapid shells
      const f = duration - 2000;
      [0, 130, 260, 390, 520, 650, 780].forEach((offset) => {
        setTimeout(() => {
          if (stopped || !canvas) return;
          rockets.push(createRocket(canvas.width, canvas.height, canvas.height * burstZoneY));
        }, f + offset);
      });
    }

    // ── Render loop ────────────────────────────────────────────────────────────
    function draw(now: number) {
      if (!canvas || !ctx) return;
      animId = requestAnimationFrame(draw);
      frameCount++;

      const elapsed = now - startTime;

      // Fade-out phase
      if (elapsed > duration - fadeOutMs) {
        const p = (elapsed - (duration - fadeOutMs)) / fadeOutMs;
        globalAlpha = Math.max(0, 1 - p);
      }

      // Semi-transparent clear → motion blur trail on rockets
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.fillStyle = "rgba(0,0,0,0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = globalAlpha;

      // ── Rockets ──────────────────────────────────────────────────────────────
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        if (r.exploded) { rockets.splice(i, 1); continue; }

        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 22) r.trail.shift();

        // Trail
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          ctx.globalAlpha = (j / r.trail.length) * 0.55 * globalAlpha;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2);
          ctx.fillStyle = r.colors[0];
          ctx.fill();
        }
        ctx.globalAlpha = globalAlpha;

        // Head glow
        const grd = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, 7);
        grd.addColorStop(0, "#ffffff");
        grd.addColorStop(0.3, r.colors[0]);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(r.x, r.y, 7, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Physics
        r.vy += 0.18;
        r.x += r.vx;
        r.y += r.vy;

        // Explode at peak or target height
        if (r.y <= r.targetY || r.vy >= 0) {
          r.exploded = true;
          sparks.push(...createSparks(r.x, r.y, r.colors));
          // Flash
          ctx.globalAlpha = 0.85 * globalAlpha;
          const flash = ctx.createRadialGradient(r.x, r.y, 0, r.x, r.y, 28);
          flash.addColorStop(0, "#ffffff");
          flash.addColorStop(0.4, r.colors[0] + "cc");
          flash.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(r.x, r.y, 28, 0, Math.PI * 2);
          ctx.fillStyle = flash;
          ctx.fill();
          ctx.globalAlpha = globalAlpha;
        }
      }

      // ── Sparks ───────────────────────────────────────────────────────────────
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.alpha -= s.decay;
        if (s.alpha <= 0) { sparks.splice(i, 1); continue; }
        s.vx *= 0.984;
        s.vy *= 0.984;
        s.vy += s.gravity;
        s.x += s.vx;
        s.y += s.vy;

        ctx.globalAlpha = s.alpha * globalAlpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();

        const halo = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius * 3);
        halo.addColorStop(0, s.color + "99");
        halo.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();
      }

      // ── Sparkles (twinkling stars across the canvas) ──────────────────────────
      // Spawn new sparkles every few frames to keep the pool populated
      if (frameCount % 4 === 0 && sparkles.length < 60) {
        sparkles.push(createSparkle(canvas.width, canvas.height));
      }

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.phase += sp.speed;

        // Lifecycle: fade in (0→0.5), fade out (0.5→1)
        const t = sp.phase % 1;
        sp.alpha = t < 0.5
          ? sp.maxAlpha * (t / 0.5)         // fade in
          : sp.maxAlpha * (1 - (t - 0.5) / 0.5); // fade out

        if (sp.phase >= 1) {
          // Respawn at a new random position
          sparkles.splice(i, 1);
          if (!stopped) sparkles.push(createSparkle(canvas.width, canvas.height));
          continue;
        }

        ctx.globalAlpha = sp.alpha * globalAlpha;
        drawSparkle(ctx, sp);
      }

      ctx.globalAlpha = 1;

      // Stop when fully faded
      if (globalAlpha <= 0) {
        cancelAnimationFrame(animId);
        stopped = true;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        onDoneRef.current?.();
      }
    }

    return () => {
      stopped = true;
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — one-shot animation

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
