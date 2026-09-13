import type { Metadata } from "next";
import { CarLottie } from "@/components/marketing/CarLottie";
import { PublicShell } from "@/components/layout/PublicShell";
import { CarSearchForm } from "@/features/cars/presentation/CarSearchForm";
import { SearchCarGrid } from "@/features/cars/presentation/SearchCarGrid";
import { getCars } from "@/lib/data";
import { carSearchSchema } from "@spinwheels/validation";

export const metadata: Metadata = {
  title: "Browse cars — Spinwheels",
  description: "Search verified self-drive cars in Bengaluru with upfront pricing. No sign-in required to browse.",
};

export const dynamic = "force-dynamic";

type SearchPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const raw = {
    location: typeof params.location === "string" ? params.location : undefined,
    evOnly: typeof params.evOnly === "string" ? params.evOnly : undefined,
    maxPrice: typeof params.maxPrice === "string" ? params.maxPrice : undefined,
  };
  const parsed = carSearchSchema.safeParse(raw);
  const filters = parsed.success ? parsed.data : {};
  const cars = getCars(filters);

  const defaults = {
    location: typeof params.location === "string" ? params.location : "",
    evOnly: params.evOnly === "true",
    maxPrice: typeof params.maxPrice === "string" ? params.maxPrice : "",
  };

  const hasFilters = Boolean(filters.location || filters.evOnly || filters.maxPrice);

  return (
    <PublicShell
      hero
      title="Browse verified cars"
      subtitle="Full pricing upfront. No sign-in needed until you book."
      heroArt={<CarLottie variant="search" className="search-hero-lottie" />}
    >
      <CarSearchForm defaults={defaults} />
      <p className="search-results-meta">
        {hasFilters ? `${cars.length} car${cars.length === 1 ? "" : "s"} matching your filters` : `${cars.length} cars available`}
      </p>
      <SearchCarGrid cars={cars} />
    </PublicShell>
  );
}
