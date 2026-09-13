import { AppShell } from "@/components/layout/AppShell";
import { Button, Card, Stat } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getBookingsForUser, getOwnerCars, getOwnerEarnings } from "@/lib/data";

export default async function OwnerDashboardPage() {
  const session = await requireSession(["owner"]);
  const cars = getOwnerCars(session.id);
  const bookings = getBookingsForUser(session.id, "owner");
  const earnings = getOwnerEarnings(session.id);

  return (
    <AppShell user={session} title="Owner dashboard" subtitle="Manage listings, bookings, and payouts">
      <div className="app-grid app-grid-4" style={{ marginBottom: 24 }}>
        <Stat label="Active cars" value={String(cars.filter((c) => c.status === "active").length)} />
        <Stat label="Bookings" value={String(bookings.length)} />
        <Stat label="Commission" value="15%" />
        <Stat label="Pending payouts" value={String(earnings.filter((e) => e.status === "pending").length)} />
      </div>
      <div className="app-grid app-grid-2">
        <Card title="Quick actions">
          <div className="row-actions">
            <Button href="/owner/cars/new">List a car</Button>
            <Button href="/owner/bookings" variant="outline">
              View bookings
            </Button>
          </div>
        </Card>
        <Card title="Recent bookings" subtitle="Latest renter activity">
          {bookings.slice(0, 3).map((booking) => (
            <div key={booking.id} className="detail-row">
              <span>{booking.id}</span>
              <span>{booking.status}</span>
            </div>
          ))}
        </Card>
      </div>
    </AppShell>
  );
}
