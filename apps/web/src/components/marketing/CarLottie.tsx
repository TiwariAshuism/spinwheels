"use client";

import { LottieAnimation } from "@spinwheels/ui";
import type { ReactNode } from "react";
import { marketingLotties } from "@/features/marketing/lottie/assets";

type CarLottieVariant = Exclude<keyof typeof marketingLotties, "howSteps">;

type CarLottieProps = {
  variant: CarLottieVariant;
  className?: string;
  ariaLabel?: string;
  fallback?: ReactNode;
};

const labels: Record<CarLottieVariant, string> = {
  hero: "Animated self-drive car",
  featured: "Car on the road",
  search: "Search available cars",
  instantBooking: "Fast booking clock animation",
  driverAddon: "Self-drive car with optional driver",
  ev: "Electric vehicle on the road",
  groupTrip: "Group trip car sharing",
  driver: "Self-drive car animation",
};

export function CarLottie({ variant, className = "", ariaLabel, fallback }: CarLottieProps) {
  return (
    <LottieAnimation
      className={className}
      src={marketingLotties[variant]}
      ariaLabel={ariaLabel ?? labels[variant]}
      fallback={fallback}
    />
  );
}
