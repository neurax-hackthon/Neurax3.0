// Lightweight decorative backdrop shared across content sections to keep the
// neural visual language present without heavy DOM cost (single inline SVG).
const NODES: [number, number][] = [
  [8, 15], [22, 42], [14, 78], [35, 22], [46, 62],
  [58, 12], [64, 88], [78, 38], [90, 68], [95, 18],
];

const LINES: [number, number][] = [
  [0, 1], [1, 2], [0, 3], [3, 4], [1, 4],
  [4, 7], [5, 3], [5, 7], [7, 8], [8, 9], [6, 4], [6, 8],
];

type Props = {
  className?: string;
  tint?: "gold" | "cyan";
};

export default function NeuralBackdrop({ className = "", tint = "gold" }: Props) {
  const stroke = tint === "gold" ? "#8a7346" : "#3d7a76";
  const dot = tint === "gold" ? "#c9a35f" : "#6fd8d1";

  return (
    <svg
      className={`absolute inset-0 h-full w-full opacity-[0.18] pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {LINES.map(([a, b], i) => (
        <line
          key={i}
          x1={NODES[a][0]}
          y1={NODES[a][1]}
          x2={NODES[b][0]}
          y2={NODES[b][1]}
          stroke={stroke}
          strokeWidth="0.15"
        />
      ))}
      {NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.5" fill={dot} className="animate-pulse-slow" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
    </svg>
  );
}
