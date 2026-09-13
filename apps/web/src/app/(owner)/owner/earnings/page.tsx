import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card, Stat } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getOwnerEarnings } from "@/lib/data";

export default async function OwnerEarningsPage() {
  const session = await requireSession(["owner"]);
  const earnings = getOwnerEarnings(session.id);
  const total = earnings.reduce((sum, item) => sum + item.amount, 0);

  return (
    <AppShell user={session} title="Earnings" subtitle="Weekly payouts at 15% commission">
      <div className="app-grid app-grid-3" style={{ marginBottom: 24 }}>
        <Stat label="Total earnings" value={`₹${total.toLocaleString("en-IN")}`} />
        <Stat label="Commission rate" value="15%" />
        <Stat label="Payout cycle" value="Weekly" />
      </div>
      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Booking</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((payment) => (
              <tr key={payment.id}>
                <td>{new Date(payment.createdAt).toLocaleDateString("en-IN")}</td>
                <td>{payment.bookingId}</td>
                <td>₹{payment.amount.toLocaleString("en-IN")}</td>
                <td>
                  <Badge tone={payment.status === "completed" ? "green" : "yellow"}>{payment.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
