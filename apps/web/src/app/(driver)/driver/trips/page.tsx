import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getTripsForUser } from "@/lib/data";

export default async function DriverTripsPage() {
  const session = await requireSession(["driver"]);
  const trips = getTripsForUser(session.id, "driver");

  return (
    <AppShell user={session} title="Trips" subtitle="Assigned driver trips">
      <div className="app-grid">
        {trips.map((trip) => (
          <Card key={trip.id} title={trip.route}>
            <div className="detail-list">
              <div className="detail-row">
                <span>Status</span>
                <span>
                  <Badge tone={trip.status === "completed" ? "green" : "yellow"}>{trip.status}</Badge>
                </span>
              </div>
              <div className="detail-row">
                <span>Start</span>
                <span>{new Date(trip.startTime).toLocaleString("en-IN")}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
