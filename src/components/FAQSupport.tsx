import { useState } from "react";
import { EVENT, THEMES, RULES, SCHEDULE } from "../data/hackathon";
import SectionHeading from "./SectionHeading";
import { scrollToTarget } from "../lib/gsap";

// Every answer is assembled from data that already exists elsewhere in the
// app (RULES, THEMES, SCHEDULE, EVENT) so this list can't drift out of sync
// with the rest of the site — nothing here is invented.
const eligibility = RULES.find((g) => g.title === "Eligibility");
const judging = RULES.find((g) => g.title === "Judging");
const revealItem = SCHEDULE[0]?.items.find((i) => i.label === "Problem Statement Reveal");

const FAQS = [
  {
    question: "Who can participate?",
    answer: (eligibility?.points ?? []).join(" "),
  },
  {
    question: "How long is the hackathon?",
    answer: `${EVENT.name} ${EVENT.edition} is a 24-hour hackathon, running ${EVENT.dateLabel} at ${EVENT.venue}.`,
  },
  {
    question: "What are the themes?",
    answer: `${THEMES.map((t) => t.label).join(", ")}. Full problem statements for each track are revealed by the organizers closer to the event.`,
  },
  {
    question: "When are problem statements revealed?",
    answer: revealItem
      ? `Problem statements are revealed at ${revealItem.time} on ${SCHEDULE[0].date}, right after the opening ceremony.`
      : "Problem statements are revealed by the organizers before the hackathon begins.",
  },
  {
    question: "How is judging done?",
    answer: (judging?.points ?? []).join(" "),
  },
];

export default function FAQSupport() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-28 md:py-36 px-6 bg-void overflow-hidden">
      <div className="relative max-w-3xl mx-auto">
        <SectionHeading eyebrow="STILL WONDERING" title="FAQs & Support" />

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.question}
                className="rounded-2xl border border-line bg-charcoal/60 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-bone text-sm md:text-base font-medium">{faq.question}</span>
                  <span className={`label-caps text-gold-dim transition-transform ${isOpen ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-mist text-sm leading-relaxed animate-fade-in">{faq.answer}</p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <p className="text-mist text-sm mb-4">Still have a question?</p>
          <button
            type="button"
            onClick={() => scrollToTarget("#contact")}
            className="label-caps text-xs px-7 py-3.5 rounded-full border border-line text-mist hover:text-bone hover:border-gold-dim transition-colors"
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
