import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card } from "@spinwheels/ui";
import { mockCars } from "@spinwheels/config";
import { requireSession } from "@/lib/auth/require-session";

export default async function AdminCarsPage() {
  const session = await requireSession(["admin"]);

  return (
    <AppShell user={session} title="Cars" subtitle="Fleet listings and verification">
      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Car</th>
              <th>Location</th>
              <th>Price/day</th>
              <th>Trust</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockCars.map((car) => (
              <tr key={car.id}>
                <td>
                  {car.make} {car.model}
                </td>
                <td>{car.location}</td>
                <td>₹{car.pricePerDay.toLocaleString("en-IN")}</td>
                <td>{car.trustScore}</td>
                <td>
                  <Badge tone={car.status === "active" ? "green" : "yellow"}>{car.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
