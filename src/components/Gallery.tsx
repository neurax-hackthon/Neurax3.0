import { useState } from "react";
import SectionHeading from "./SectionHeading";

const IMAGES_V1 = [
  "/images/1.0/IMG20250921111833.jpg",
  "/images/1.0/IMG_20250921_112009.jpg",
  "/images/1.0/IMG_20250921_112833.jpg",
];

const IMAGES_V2 = [
  "/images/2.0/20260314_104819.jpg",
  "/images/2.0/20260314_113252.jpg",
  "/images/2.0/20260315_095409.jpg",
];

export default function Gallery() {
  const [openImage, setOpenImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-ink overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 mb-16">
        <SectionHeading 
          eyebrow="THE ARCHIVE, IN FRAME" 
          title="Gallery" 
          subtitle="Moments from past editions." 
        />
      </div>

      <div className="flex flex-col gap-24">
        {/* NeuraX 1.0 Section */}
        <div className="relative">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
            {[...IMAGES_V1, ...IMAGES_V1, ...IMAGES_V1, ...IMAGES_V1].map((src, i) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={`v1-${i}`}
                type="button"
                onClick={() => setOpenImage(src)}
                className="group relative flex-shrink-0 mx-3 w-[280px] h-[200px] md:w-[400px] md:h-[280px] overflow-hidden rounded-2xl border border-line hover:border-gold-dim transition-colors duration-300"
              >
                <img
                  src={src}
                  alt="NeuraX 1.0"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-void/20 group-hover:bg-transparent transition-colors duration-300" />
              </button>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <a 
              href="https://neurax2025.vercel.app/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-line bg-charcoal/80 text-mist hover:text-cyan hover:border-cyan/50 transition-all duration-300"
            >
              <span className="label-caps text-xs">Want to see more of NeuraX 1.0? Visit our site</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>

        {/* NeuraX 2.0 Section */}
        <div className="relative">
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused]" style={{ animationDirection: "reverse" }}>
            {[...IMAGES_V2, ...IMAGES_V2, ...IMAGES_V2, ...IMAGES_V2].map((src, i) => (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={`v2-${i}`}
                type="button"
                onClick={() => setOpenImage(src)}
                className="group relative flex-shrink-0 mx-3 w-[280px] h-[200px] md:w-[400px] md:h-[280px] overflow-hidden rounded-2xl border border-line hover:border-gold-dim transition-colors duration-300"
              >
                <img
                  src={src}
                  alt="NeuraX 2.0"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-void/20 group-hover:bg-transparent transition-colors duration-300" />
              </button>
            ))}
          </div>
          
          <div className="mt-8 flex justify-center">
            <a 
              href="https://neurax2-0.vercel.app/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-line bg-charcoal/80 text-mist hover:text-cyan hover:border-cyan/50 transition-all duration-300"
            >
              <span className="label-caps text-xs">Want to see more of NeuraX 2.0? Visit our site</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
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
