import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/layout/PublicShell";
import { BookingPanel } from "@/features/bookings/presentation/BookingPanel";
import { CarDetailView } from "@/features/cars/presentation/CarDetailView";
import { getSession } from "@/lib/auth/session";
import { getCarById } from "@/lib/data";

export const dynamic = "force-dynamic";

type CarDetailPageProps = {
  params: Promise<{ carId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: CarDetailPageProps): Promise<Metadata> {
  const { carId } = await params;
  const car = getCarById(carId);
  if (!car) return { title: "Car not found — Spinwheels" };
  return {
    title: `${car.make} ${car.model} — Spinwheels`,
    description: car.description,
  };
}

export default async function CarDetailPage({ params, searchParams }: CarDetailPageProps) {
  const { carId } = await params;
  const query = await searchParams;
  const car = getCarById(carId);
  if (!car) notFound();

  const session = await getSession();
  const bookingDefaults = {
    startDate: typeof query.startDate === "string" ? query.startDate : undefined,
    endDate: typeof query.endDate === "string" ? query.endDate : undefined,
    pickupNote: typeof query.pickupNote === "string" ? query.pickupNote : undefined,
  };

  return (
    <PublicShell
      title={`${car.make} ${car.model}`}
      subtitle={`${car.year} · ${car.location} · ₹${car.pricePerDay.toLocaleString("en-IN")}/day`}
    >
      <div className="car-detail-layout">
        <CarDetailView car={car} />
        <BookingPanel carId={car.id} session={session} defaults={bookingDefaults} />
      </div>
    </PublicShell>
  );
}
