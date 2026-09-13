import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getTripsForUser } from "@/lib/data";

export default async function TripsPage() {
  const session = await requireSession(["renter"]);
  const trips = getTripsForUser(session.id, "renter");

  return (
    <AppShell user={session} title="Trips" subtitle="Your upcoming and past trips">
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
            <Link href={`/booking/${trip.bookingId}`} style={{ marginTop: 12, display: "inline-block" }}>
              View booking
            </Link>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
