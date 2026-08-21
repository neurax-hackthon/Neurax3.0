import { useState } from "react";
import SectionHeading from "./SectionHeading";

// ─── NeuraX 1.0 images ──────────────────────────────────────────────────────
const IMAGES_V1 = [
  "/images/1.0/1.jpeg",
  "/images/1.0/2.jpeg",
  "/images/1.0/3.jpeg",
  "/images/1.0/4.jpeg",
  "/images/1.0/5.jpeg",
  "/images/1.0/6.jpeg",
  "/images/1.0/7.jpeg",
  "/images/1.0/8.jpeg",
  "/images/1.0/IMG20250921111833.jpg",
  "/images/1.0/IMG_20250921_112009.jpg",
  "/images/1.0/IMG_20250921_112833.jpg",
];

// ─── NeuraX 2.0 images ──────────────────────────────────────────────────────
const IMAGES_V2 = [
  "/images/2.0/1.jpeg",
  "/images/2.0/20260314_113252.jpg",
  "/images/2.0/2.jpg",
  "/images/2.0/3.jpg",
  "/images/2.0/4.jpg",
  "/images/2.0/20260314_115340.jpg",
  "/images/2.0/20260314_184826.jpg",
  "/images/2.0/20260315_095409.jpg",
  "/images/2.0/20260315_100449.jpg",
  "/images/2.0/20260315_101725.jpg",
];

// ─── Gallery edition config ──────────────────────────────────────────────────
type Edition = {
  number: string;
  name: string;
  images: string[];
  altPrefix: string;
  direction: "normal" | "reverse";
  siteUrl?: string;
  comingSoon?: boolean;
};

const EDITIONS: Edition[] = [
  {
    number: "01",
    name: "NeuraX 1.0",
    images: IMAGES_V1,
    altPrefix: "NeuraX 1.0",
    direction: "normal",
    siteUrl: "https://neurax2025.vercel.app/",
  },
  {
    number: "02",
    name: "NeuraX 2.0",
    images: IMAGES_V2,
    altPrefix: "NeuraX 2.0",
    direction: "reverse",
    siteUrl: "https://neurax2-0.vercel.app/",
  },
  {
    number: "03",
    name: "NeuraX 3.0",
    images: [],
    altPrefix: "NeuraX 3.0",
    direction: "normal",
    comingSoon: true,
  },
];

export default function Gallery() {
  const [openImage, setOpenImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-ink overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 mb-16">
        <SectionHeading
          eyebrow="THE ARCHIVE, IN FRAME"
          title="Gallery"
          subtitle="Moments from past editions of NeuraX."
        />
      </div>

      <div className="flex flex-col gap-28">
        {EDITIONS.map((edition) => (
          <div key={edition.name} className="relative">
            {/* Edition header */}
            <div className="px-6 mb-8 flex items-center gap-5 max-w-7xl mx-auto">
              <span className="font-display text-5xl md:text-6xl text-gold-dim/40 font-semibold leading-none select-none">
                {edition.number}
              </span>
              <div className="h-px flex-1 bg-line" />
              <span className="label-caps text-xs md:text-sm text-bone font-bold tracking-[0.22em]">
                {edition.name}
              </span>
              <div className="h-px w-8 bg-line" />
            </div>

            {/* Images or Coming Soon */}
            {edition.comingSoon ? (
              <div className="max-w-7xl mx-auto px-6">
                <div className="rounded-3xl border border-line/60 bg-charcoal/30 flex flex-col items-center justify-center py-20 gap-4">
                  <span className="text-4xl">📸</span>
                  <p className="label-caps text-sm text-gold-dim tracking-widest">
                    Coming Soon
                  </p>
                  <p className="text-mist text-sm max-w-xs text-center">
                    Photos from {edition.name} will appear here after the event.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Marquee strip — hover-pause desktop only */}
                <div className="relative overflow-hidden">
                  <div
                    className="flex w-max md:hover:[animation-play-state:paused]"
                    style={{
                      animation: `marquee 45s linear infinite`,
                      animationDirection: edition.direction === "reverse" ? "reverse" : "normal",
                    }}
                  >
                    {[...edition.images, ...edition.images, ...edition.images, ...edition.images].map(
                      (src, i) => (
                        <button
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${edition.name}-${i}`}
                          type="button"
                          onClick={() => setOpenImage(src)}
                          className="group relative flex-shrink-0 mx-3 overflow-hidden rounded-2xl border border-line md:hover:border-gold-dim transition-colors duration-300 touch-manipulation"
                          style={{ width: "280px", height: "200px" }}
                        >
                          <img
                            src={src}
                            alt={`${edition.altPrefix} — photo ${(i % edition.images.length) + 1}`}
                            className="h-full w-full object-cover md:group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-void/20 md:group-hover:bg-transparent transition-colors duration-300" />
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Visit site link */}
                {edition.siteUrl && (
                  <div className="mt-8 flex justify-center px-6">
                    <a
                      href={edition.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-line bg-charcoal/80 text-mist hover:text-cyan hover:border-cyan/50 transition-all duration-300"
                    >
                      <span className="label-caps text-xs">
                        Want to see more of {edition.name}? Visit our site
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </a>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {openImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-md px-4 py-10 animate-fade-in"
          onClick={() => setOpenImage(null)}
        >
          <button
            type="button"
            onClick={() => setOpenImage(null)}
            aria-label="Close"
            className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center rounded-full bg-charcoal/50 border border-line text-mist hover:text-bone hover:border-gold-dim transition-colors"
          >
            ✕
          </button>
          <img
            src={openImage}
            alt="Enlarged gallery view"
            className="max-h-[85vh] max-w-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
