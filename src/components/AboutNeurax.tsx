import { EVENT, RULES, BENEFITS } from "../data/hackathon";
import SectionHeading from "./SectionHeading";

// Content here is assembled from copy and data that already exists
// elsewhere in the app (EVENT, RULES' Eligibility group, BENEFITS) rather
// than invented — swap in official "what is NeuraX" copy when available.
const eligibility = RULES.find((group) => group.title === "Eligibility");
const whyJoin = BENEFITS.slice(0, 4);

export default function AboutNeurax() {
  return (
    <section id="about" className="relative py-28 md:py-36 px-6 bg-ink overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading
          eyebrow="NOW ANNOUNCING"
          title="NeuraX 3.0"
          subtitle={`A competitive hackathon experience: ${EVENT.tagline.toLowerCase()}`}
        />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-line bg-charcoal/60 p-7 md:p-8">
            <h3 className="label-caps text-sm text-gold-bright mb-4">What Is NeuraX?</h3>
            <p className="text-mist text-sm md:text-base leading-relaxed">
              {EVENT.name} {EVENT.edition} is a 24-hour hackathon — one continuous signal from spark
              to showcase. Teams turn an idea into a working demo, guided by mentors along the way
              and judged on real execution.
            </p>
            <p className="text-mist text-sm md:text-base leading-relaxed mt-4">
              {EVENT.dateLabel} &middot; {EVENT.venue}
            </p>
          </div>

          <div className="rounded-2xl border border-line bg-charcoal/60 p-7 md:p-8">
            <h3 className="label-caps text-sm text-gold-bright mb-4">Who Can Participate?</h3>
            <ul className="flex flex-col gap-3">
              {(eligibility?.points ?? []).map((point) => (
                <li key={point} className="flex gap-3 text-mist text-sm leading-relaxed">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="label-caps text-sm text-gold-bright mb-5 text-center">Why Join</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {whyJoin.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-line bg-charcoal/60 hover:border-gold-dim transition-colors duration-300 p-5 text-center"
              >
                <span className="text-2xl">{benefit.icon}</span>
                <p className="label-caps text-[10px] text-bone mt-3">{benefit.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="https://forms.gle/RCSs4ajT6XzV2evJA"
            target="_blank"
            rel="noreferrer"
            className="label-caps text-xs px-8 py-4 rounded-full bg-gold-bright text-void font-semibold hover:bg-bone transition-colors"
          >
            Register Now
          </a>
        </div>
      </div>
    </section>
  );
}
