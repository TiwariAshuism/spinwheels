import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card } from "@spinwheels/ui";
import { mockPayments } from "@spinwheels/config";
import { requireSession } from "@/lib/auth/require-session";

export default async function AdminPaymentsPage() {
  const session = await requireSession(["admin"]);

  return (
    <AppShell user={session} title="Payments" subtitle="Charges, refunds, and payouts">
      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Booking</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.bookingId}</td>
                <td>{payment.type}</td>
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
