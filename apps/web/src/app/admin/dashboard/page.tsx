import { AppShell } from "@/components/layout/AppShell";
import { Card, Stat } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { mockBookings, mockCars, mockPayments } from "@spinwheels/config";
import { getAllDisputes, getAllUsers, getAllVerifications } from "@/lib/data";

export default async function AdminDashboardPage() {
  const session = await requireSession(["admin"]);

  return (
    <AppShell user={session} title="Admin dashboard" subtitle="Platform overview">
      <div className="app-grid app-grid-4" style={{ marginBottom: 24 }}>
        <Stat label="Users" value={String(getAllUsers().length)} />
        <Stat label="Cars" value={String(mockCars.length)} />
        <Stat label="Bookings" value={String(mockBookings.length)} />
        <Stat label="Open disputes" value={String(getAllDisputes().filter((d) => d.status === "open").length)} />
      </div>
      <div className="app-grid app-grid-2">
        <Card title="Pending verifications" subtitle={`${getAllVerifications().filter((v) => v.status === "pending").length} awaiting review`}>
          <p>Review license and vehicle documents in the verification queue.</p>
        </Card>
        <Card title="Payments" subtitle={`${mockPayments.length} records`}>
          <p>Monitor charges, refunds, and owner payouts across the platform.</p>
        </Card>
      </div>
    </AppShell>
  );
}
