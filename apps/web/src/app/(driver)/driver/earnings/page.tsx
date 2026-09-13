import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card, Stat } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getDriverEarnings } from "@/lib/data";

export default async function DriverEarningsPage() {
  const session = await requireSession(["driver"]);
  const earnings = getDriverEarnings(session.id);

  return (
    <AppShell user={session} title="Earnings" subtitle="Transparent per-trip commission">
      <Stat label="Total earned" value={`₹${earnings.reduce((s, e) => s + e.amount, 0).toLocaleString("en-IN")}`} />
      <Card className="earnings-table">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((payment) => (
              <tr key={payment.id}>
                <td>{new Date(payment.createdAt).toLocaleDateString("en-IN")}</td>
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
