import { useState } from "react";
import { PREVIOUS_HACKATHONS } from "../data/hackathon";
import SectionHeading from "./SectionHeading";

// Only the two historical photos that already exist in the project are
// used here — add more images to public/images and this array to grow
// the gallery.
const GALLERY_IMAGES = [
  { src: "/images/neurax-history1.jpeg", edition: PREVIOUS_HACKATHONS[0] },
  { src: "/images/neurax-history-2.jpeg", edition: PREVIOUS_HACKATHONS[1] },
];

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="relative py-28 md:py-36 px-6 bg-ink overflow-hidden">
      <div className="relative max-w-5xl mx-auto">
        <SectionHeading eyebrow="THE ARCHIVE, IN FRAME" title="Gallery" subtitle="Moments from past editions." />

        <div className="grid sm:grid-cols-2 gap-6">
          {GALLERY_IMAGES.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setOpenIndex(i)}
              className="group relative overflow-hidden rounded-2xl border border-line hover:border-gold-dim transition-colors duration-300 aspect-[4/3]"
            >
              <img
                src={img.src}
                alt={img.edition.edition}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 label-caps text-[10px] text-bone">
                {img.edition.edition} &middot; {img.edition.year}
              </span>
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-sm px-4 py-10 animate-fade-in"
          onClick={() => setOpenIndex(null)}
        >
          <button
            type="button"
            onClick={() => setOpenIndex(null)}
            aria-label="Close"
            className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full border border-line text-mist hover:text-bone hover:border-gold-dim transition-colors"
          >
            ✕
          </button>
          <img
            src={GALLERY_IMAGES[openIndex].src}
            alt={GALLERY_IMAGES[openIndex].edition.edition}
            className="max-h-[80vh] max-w-full rounded-2xl border border-line"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
