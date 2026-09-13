import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { Badge, Button, Card } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getBookingById, getCarById } from "@/lib/data";

type BookingPageProps = {
  params: Promise<{ bookingId: string }>;
};

export default async function BookingDetailPage({ params }: BookingPageProps) {
  const session = await requireSession(["renter"]);
  const { bookingId } = await params;
  const booking = getBookingById(bookingId);
  if (!booking || booking.renterId !== session.id) notFound();

  const car = getCarById(booking.carId);

  return (
    <AppShell user={session} title="Booking details" subtitle={`Booking ${booking.id}`}>
      <div className="app-grid app-grid-2">
        <Card title="Trip summary">
          <div className="detail-list">
            <div className="detail-row">
              <span>Car</span>
              <span>
                {car ? `${car.make} ${car.model}` : booking.carId}
              </span>
            </div>
            <div className="detail-row">
              <span>Dates</span>
              <span>
                {booking.startDate} → {booking.endDate}
              </span>
            </div>
            <div className="detail-row">
              <span>Total</span>
              <span>₹{booking.totalAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="detail-row">
              <span>Deposit</span>
              <span>₹{booking.deposit.toLocaleString("en-IN")}</span>
            </div>
            <div className="detail-row">
              <span>Status</span>
              <span>
                <Badge tone={booking.status === "confirmed" ? "green" : "yellow"}>{booking.status}</Badge>
              </span>
            </div>
          </div>
        </Card>
        <Card title="Pickup">
          <p>{booking.pickupNote ?? "Exact GPS pin shared after confirmation"}</p>
          <div className="row-actions" style={{ marginTop: 16 }}>
            <Button href="/trips" variant="outline">
              View trip
            </Button>
            <Button href="/payments" variant="outline">
              Payments
            </Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
