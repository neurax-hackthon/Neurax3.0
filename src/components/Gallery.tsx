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

// ─── NeuraX 3.0 media (browser-compatible files only — HEIC excluded) ────────
const IMAGES_V3 = [
  "/N 3.0/IMG_20260919_102325.jpg.jpeg",
  "/N 3.0/IMG_20260919_102410.jpg.jpeg",
  "/N 3.0/IMG_5523.HEIC.jpg",
  "/N 3.0/IMG_5535.HEIC.jpg",
  "/N 3.0/IMG_5559.HEIC.jpg",
  "/N 3.0/IMG_6812.JPG.jpeg",
  "/N 3.0/IMG_6813.JPG.jpeg",
  "/N 3.0/WhatsApp Image 2026-09-28 at 11.35.59 AM.jpeg",
  "/N 3.0/WhatsApp Image 2026-09-28 at 11.36.00 AM.jpeg",
  "/N 3.0/WhatsApp Image 2026-09-28 at 11.36.01 AM.jpeg",
  "/N 3.0/WhatsApp Image 2026-09-28 at 11.36.04 AM.jpeg",
  "/N 3.0/WhatsApp Image 2026-09-28 at 11.36.11 AM.jpeg",
  "/N 3.0/WhatsApp Image 2026-09-28 at 11.36.14 AM.jpeg",
  "/N 3.0/WhatsApp Image 2026-09-28 at 11.36.16 AM.jpeg",
  "/N 3.0/WhatsApp Image 2026-09-28 at 11.36.22 AM.jpeg",
];

const VIDEOS_V3 = [
  "/N 3.0/WhatsApp Video 2026-09-28 at 11.35.53 AM.mp4",
  "/N 3.0/WhatsApp Video 2026-09-28 at 11.35.58 AM.mp4",
];

// ─── Gallery edition config ──────────────────────────────────────────────────
type Edition = {
  number: string;
  name: string;
  images: string[];
  videos?: string[];
  altPrefix: string;
  direction: "normal" | "reverse";
  siteUrl?: string;
};

// Combined media items for the marquee (images + videos interleaved)
type MediaItem = { type: "image"; src: string } | { type: "video"; src: string };

function buildMediaItems(images: string[], videos: string[] = []): MediaItem[] {
  const items: MediaItem[] = images.map((src) => ({ type: "image", src }));
  // Interleave videos roughly evenly
  const step = Math.max(1, Math.floor(items.length / (videos.length + 1)));
  videos.forEach((src, i) => {
    items.splice(Math.min((i + 1) * step + i, items.length), 0, { type: "video", src });
  });
  return items;
}

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
    images: IMAGES_V3,
    videos: VIDEOS_V3,
    altPrefix: "NeuraX 3.0",
    direction: "normal",
  },
];

export default function Gallery() {
  const [openImage, setOpenImage] = useState<string | null>(null);
  const [openVideo, setOpenVideo] = useState<string | null>(null);

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
        {EDITIONS.map((edition) => {
          const mediaItems = buildMediaItems(edition.images, edition.videos);
          // Quadruple the list for a seamless infinite marquee
          const marqueeItems = [...mediaItems, ...mediaItems, ...mediaItems, ...mediaItems];
          return (
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

              {/* Marquee strip — hover-pause desktop only */}
              <>
                <div className="relative overflow-hidden">
                  <div
                    className="flex w-max md:hover:[animation-play-state:paused]"
                    style={{
                      animation: `marquee 45s linear infinite`,
                      animationDirection: edition.direction === "reverse" ? "reverse" : "normal",
                    }}
                  >
                    {marqueeItems.map((item, i) =>
                      item.type === "image" ? (
                        <button
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${edition.name}-img-${i}`}
                          type="button"
                          onClick={() => setOpenImage(item.src)}
                          className="group relative flex-shrink-0 mx-3 overflow-hidden rounded-2xl border border-line md:hover:border-gold-dim transition-colors duration-300 touch-manipulation"
                          style={{ width: "280px", height: "200px" }}
                        >
                          <img
                            src={item.src}
                            alt={`${edition.altPrefix} — photo ${(i % mediaItems.length) + 1}`}
                            className="h-full w-full object-cover md:group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-void/20 md:group-hover:bg-transparent transition-colors duration-300" />
                        </button>
                      ) : (
                        <button
                          // eslint-disable-next-line react/no-array-index-key
                          key={`${edition.name}-vid-${i}`}
                          type="button"
                          onClick={() => setOpenVideo(item.src)}
                          className="group relative flex-shrink-0 mx-3 overflow-hidden rounded-2xl border border-line md:hover:border-gold-dim transition-colors duration-300 touch-manipulation"
                          style={{ width: "340px", height: "200px" }}
                        >
                          <video
                            src={item.src}
                            className="h-full w-full object-cover"
                            muted
                            playsInline
                            preload="metadata"
                          />
                          {/* Play icon overlay */}
                          <div className="absolute inset-0 flex items-center justify-center bg-void/40 md:group-hover:bg-void/20 transition-colors duration-300">
                            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gold-bright/20 border border-gold-bright/60 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gold-bright ml-1">
                                <polygon points="5,3 19,12 5,21" />
                              </svg>
                            </div>
                          </div>
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
            </div>
          );
        })}
      </div>

      {/* Image Lightbox */}
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

      {/* Video Lightbox */}
      {openVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-void/90 backdrop-blur-md px-4 py-10 animate-fade-in"
          onClick={() => setOpenVideo(null)}
        >
          <button
            type="button"
            onClick={() => setOpenVideo(null)}
            aria-label="Close"
            className="absolute top-6 right-6 h-12 w-12 flex items-center justify-center rounded-full bg-charcoal/50 border border-line text-mist hover:text-bone hover:border-gold-dim transition-colors"
          >
            ✕
          </button>
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video
            src={openVideo}
            className="max-h-[85vh] max-w-full rounded-xl shadow-2xl"
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
