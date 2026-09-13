import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/PublicShell";
import { CarCard } from "@/features/cars/presentation/CarCard";
import { CarSearchForm } from "@/features/cars/presentation/CarSearchForm";
import { getCars } from "@/lib/data";
import { carSearchSchema } from "@spinwheels/validation";
import { ScrollReveal } from "@spinwheels/ui";

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
  const parsed = carSearchSchema.safeParse({
    location: params.location,
    evOnly: params.evOnly,
    maxPrice: params.maxPrice,
  });

  const filters = parsed.success ? parsed.data : {};
  const cars = getCars({
    location: filters.location,
    evOnly: filters.evOnly,
    maxPrice: filters.maxPrice,
  });

  const defaults = {
    location: typeof params.location === "string" ? params.location : "",
    evOnly: params.evOnly === "true",
    maxPrice: typeof params.maxPrice === "string" ? params.maxPrice : "",
  };

  return (
    <PublicShell
      hero
      title="Browse verified cars"
      subtitle="Full pricing upfront. No sign-in needed until you book."
    >
      <ScrollReveal>
        <CarSearchForm defaults={defaults} />
      </ScrollReveal>
      <div className="app-grid app-grid-3 public-car-grid">
        {cars.map((car, index) => (
          <ScrollReveal key={car.id} delay={index * 70}>
            <CarCard car={car} />
          </ScrollReveal>
        ))}
      </div>
      {cars.length === 0 ? (
        <ScrollReveal>
          <p className="public-empty">No cars match your filters. Try a different location or price range.</p>
        </ScrollReveal>
      ) : null}
    </PublicShell>
  );
}
