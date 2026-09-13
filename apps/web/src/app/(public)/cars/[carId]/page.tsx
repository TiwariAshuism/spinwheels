import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicShell } from "@/components/layout/PublicShell";
import { BookingPanel } from "@/features/bookings/presentation/BookingPanel";
import { Badge, Card, ScrollReveal } from "@spinwheels/ui";
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
    description: `Rent ${car.make} ${car.model} in ${car.location} from ₹${car.pricePerDay}/day.`,
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
      <div className="app-grid app-grid-2">
        <ScrollReveal>
          <Card title="Vehicle details" subtitle="Verified listing with transparent pricing">
            <div className="detail-list">
              <div className="detail-row">
                <span>Price per day</span>
                <span>₹{car.pricePerDay.toLocaleString("en-IN")}</span>
              </div>
              <div className="detail-row">
                <span>Deposit</span>
                <span>₹{car.deposit.toLocaleString("en-IN")}</span>
              </div>
              <div className="detail-row">
                <span>Trust score</span>
                <span>{car.trustScore}</span>
              </div>
              <div className="detail-row">
                <span>Rating</span>
                <span>{car.rating} / 5</span>
              </div>
              <div className="detail-row">
                <span>Registration</span>
                <span>{car.registration}</span>
              </div>
            </div>
            <div className="row-actions" style={{ marginTop: 16 }}>
              {car.ev ? <Badge tone="green">EV</Badge> : null}
              {car.instantBooking ? <Badge tone="yellow">2hr pickup</Badge> : null}
              <Badge tone="neutral">{car.status}</Badge>
            </div>
          </Card>
        </ScrollReveal>
        <ScrollReveal delay={120}>
          <BookingPanel carId={car.id} session={session} defaults={bookingDefaults} />
        </ScrollReveal>
      </div>
    </PublicShell>
  );
}
