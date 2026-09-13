import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getPaymentsForUser } from "@/lib/data";

export default async function PaymentsPage() {
  const session = await requireSession(["renter"]);
  const payments = getPaymentsForUser(session.id);

  return (
    <AppShell user={session} title="Payments" subtitle="Charges, deposits, and refunds">
      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id}>
                <td>{new Date(payment.createdAt).toLocaleDateString("en-IN")}</td>
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
