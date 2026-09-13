import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card, Stat } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getDriverEarnings, getTripsForUser } from "@/lib/data";

export default async function DriverDashboardPage() {
  const session = await requireSession(["driver"]);
  const trips = getTripsForUser(session.id, "driver");
  const earnings = getDriverEarnings(session.id);

  return (
    <AppShell user={session} title="Driver dashboard" subtitle="Your shifts, trips, and earnings">
      <div className="app-grid app-grid-3" style={{ marginBottom: 24 }}>
        <Stat label="Assigned trips" value={String(trips.length)} />
        <Stat label="Commission" value="20%" />
        <Stat label="Earnings" value={`₹${earnings.reduce((s, e) => s + e.amount, 0).toLocaleString("en-IN")}`} />
      </div>
      <Card title="Upcoming trips">
        {trips.map((trip) => (
          <div key={trip.id} className="detail-row">
            <span>{trip.route}</span>
            <span>
              <Badge tone={trip.status === "completed" ? "green" : "yellow"}>{trip.status}</Badge>
            </span>
          </div>
        ))}
      </Card>
    </AppShell>
  );
}
