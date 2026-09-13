"use client";

import type { Car } from "@spinwheels/types";
import { useCallback, useEffect, useState } from "react";
import { CarCard } from "./CarCard";

type FeaturedCarsCarouselProps = {
  cars: Car[];
};

function getVisibleCount(width: number) {
  if (width >= 1100) return 3;
  if (width >= 720) return 2;
  return 1;
}

export function FeaturedCarsCarousel({ cars }: FeaturedCarsCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(1);
  const total = cars.length;
  const maxIndex = Math.max(0, total - visibleCount);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (total <= visibleCount) return;
      const clamped = Math.max(0, Math.min(nextIndex, maxIndex));
      setIndex(clamped);
    },
    [maxIndex, total, visibleCount],
  );

  const next = useCallback(() => goTo(index >= maxIndex ? 0 : index + 1), [goTo, index, maxIndex]);
  const prev = useCallback(() => goTo(index <= 0 ? maxIndex : index - 1), [goTo, index, maxIndex]);

  useEffect(() => {
    if (total <= visibleCount || paused) return;
    const timer = window.setInterval(next, 6000);
    return () => window.clearInterval(timer);
  }, [next, paused, total, visibleCount]);

  if (total === 0) return null;

  const slideWidth = 100 / visibleCount;
  const showControls = total > visibleCount;

  return (
    <div
      className="featured-carousel"
      style={{ ["--featured-visible" as string]: visibleCount }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="featured-carousel-viewport">
        <div
          className="featured-carousel-track"
          style={{ transform: `translateX(-${index * slideWidth}%)` }}
        >
          {cars.map((car) => (
            <div key={car.id} className="featured-carousel-slide">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
      {showControls ? (
        <>
          <button type="button" className="featured-carousel-btn featured-carousel-btn-prev" onClick={prev} aria-label="Previous cars">
            ‹
          </button>
          <button type="button" className="featured-carousel-btn featured-carousel-btn-next" onClick={next} aria-label="Next cars">
            ›
          </button>
          <div className="featured-carousel-dots">
            {Array.from({ length: maxIndex + 1 }, (_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                aria-label={`Show slide ${dotIndex + 1}`}
                className={`featured-carousel-dot${dotIndex === index ? " is-active" : ""}`}
                onClick={() => goTo(dotIndex)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
