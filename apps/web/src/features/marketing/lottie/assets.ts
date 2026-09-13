export const marketingLotties = {
  hero: "/lottie/car-hero.lottie",
  featured: "/lottie/car-road.json",
  search: "/lottie/search.json",
  instantBooking: "/lottie/instant.json",
  driverAddon: "/lottie/car-hero.lottie",
  ev: "/lottie/car-road.json",
  groupTrip: "/lottie/car-road.json",
  driver: "/lottie/car-hero.lottie",
  howSteps: {
    Search: "/lottie/search.json",
    Book: "/lottie/book.json",
    Verify: "/lottie/verify.json",
    Drive: "/lottie/car-hero.lottie",
  },
} as const;

export type MarketingLottieKey = keyof typeof marketingLotties;
