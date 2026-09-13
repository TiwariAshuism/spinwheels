"use client";

import type { Car } from "@spinwheels/types";
import { MotionReveal, MotionStagger, MotionStaggerItem } from "@spinwheels/ui";
import { CarCard } from "./CarCard";

type SearchCarGridProps = {
  cars: Car[];
};

export function SearchCarGrid({ cars }: SearchCarGridProps) {
  if (cars.length === 0) {
    return (
      <MotionReveal direction="fade">
        <p className="public-empty">No cars match your filters. Try a different location or price range.</p>
      </MotionReveal>
    );
  }

  return (
    <MotionStagger className="public-car-grid">
      {cars.map((car) => (
        <MotionStaggerItem key={car.id}>
          <CarCard car={car} />
        </MotionStaggerItem>
      ))}
    </MotionStagger>
  );
}
