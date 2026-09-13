"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type MouseEvent } from "react";

type ImageCarouselProps = {
  images: string[];
  alt: string;
  sizes?: string;
  priority?: boolean;
  variant?: "hero" | "card";
  autoPlayMs?: number;
  className?: string;
};

export function ImageCarousel({
  images,
  alt,
  sizes = "100vw",
  priority = false,
  variant = "hero",
  autoPlayMs = 5000,
  className = "",
}: ImageCarouselProps) {
  const slides = images.length > 0 ? images : ["/icons/icon-192.png"];
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (slides.length <= 1) return;
      setIndex((nextIndex + slides.length) % slides.length);
    },
    [slides.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  const handleControlClick = (event: MouseEvent, action: () => void) => {
    event.preventDefault();
    event.stopPropagation();
    action();
  };

  useEffect(() => {
    if (slides.length <= 1 || autoPlayMs <= 0 || paused) return;
    const timer = window.setInterval(next, autoPlayMs);
    return () => window.clearInterval(timer);
  }, [autoPlayMs, next, paused, slides.length]);

  const showControls = slides.length > 1;
  const rootClass = ["image-carousel", `image-carousel-${variant}`, className].filter(Boolean).join(" ");

  return (
    <div
      className={rootClass}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="image-carousel-viewport">
        <div className="image-carousel-track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((src, slideIndex) => (
            <div key={`${src}-${slideIndex}`} className="image-carousel-slide">
              <Image
                src={src}
                alt={`${alt}${slides.length > 1 ? ` — photo ${slideIndex + 1}` : ""}`}
                fill
                priority={priority && slideIndex === 0}
                sizes={sizes}
                className="image-carousel-img"
              />
            </div>
          ))}
        </div>
      </div>

      {showControls ? (
        <>
          <button
            type="button"
            className="image-carousel-btn image-carousel-btn-prev"
            onClick={(event) => handleControlClick(event, prev)}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            className="image-carousel-btn image-carousel-btn-next"
            onClick={(event) => handleControlClick(event, next)}
            aria-label="Next photo"
          >
            ›
          </button>
          <div className="image-carousel-dots" role="tablist" aria-label="Photo gallery">
            {slides.map((src, dotIndex) => (
              <button
                key={`dot-${src}-${dotIndex}`}
                type="button"
                role="tab"
                aria-selected={dotIndex === index}
                aria-label={`Show photo ${dotIndex + 1}`}
                className={`image-carousel-dot${dotIndex === index ? " is-active" : ""}`}
                onClick={(event) => handleControlClick(event, () => goTo(dotIndex))}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
