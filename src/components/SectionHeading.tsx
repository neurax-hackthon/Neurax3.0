type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
};

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }: Props) {
  const isCenter = align === "center";
  return (
    <div className={`flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"} mb-14 md:mb-20`}>
      <span className="label-caps text-[11px] md:text-xs text-cyan mb-4">{eyebrow}</span>
      <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-bone text-balance max-w-3xl">
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-5 text-mist text-sm md:text-base max-w-xl ${isCenter ? "" : ""}`}>{subtitle}</p>
      )}
    </div>
  );
}
