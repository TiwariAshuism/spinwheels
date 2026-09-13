import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getBookingsForUser, getCarById } from "@/lib/data";

export default async function OwnerBookingsPage() {
  const session = await requireSession(["owner"]);
  const bookings = getBookingsForUser(session.id, "owner");

  return (
    <AppShell user={session} title="Bookings" subtitle="Incoming and active reservations">
      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Booking</th>
              <th>Car</th>
              <th>Dates</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => {
              const car = getCarById(booking.carId);
              return (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{car ? `${car.make} ${car.model}` : booking.carId}</td>
                  <td>
                    {booking.startDate} → {booking.endDate}
                  </td>
                  <td>₹{booking.totalAmount.toLocaleString("en-IN")}</td>
                  <td>
                    <Badge tone={booking.status === "confirmed" ? "green" : "yellow"}>{booking.status}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
