import { AppShell } from "@/components/layout/AppShell";
import { Badge, Button, Card } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getOwnerCars } from "@/lib/data";

export default async function OwnerCarsPage() {
  const session = await requireSession(["owner"]);
  const cars = getOwnerCars(session.id);

  return (
    <AppShell user={session} title="Your cars" subtitle="Listings and verification status">
      <div className="row-actions" style={{ marginBottom: 20 }}>
        <Button href="/owner/cars/new">List new car</Button>
      </div>
      <div className="app-grid app-grid-2">
        {cars.map((car) => (
          <Card key={car.id} title={`${car.make} ${car.model}`} subtitle={car.location}>
            <div className="detail-list">
              <div className="detail-row">
                <span>Price/day</span>
                <span>₹{car.pricePerDay.toLocaleString("en-IN")}</span>
              </div>
              <div className="detail-row">
                <span>Status</span>
                <span>
                  <Badge tone={car.status === "active" ? "green" : "yellow"}>{car.status}</Badge>
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
