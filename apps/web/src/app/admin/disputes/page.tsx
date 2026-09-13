import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card } from "@spinwheels/ui";
import { ResolveDisputeForm } from "@/features/admin/presentation/ResolveDisputeForm";
import { requireSession } from "@/lib/auth/require-session";
import { getAllDisputes } from "@/lib/data";

export default async function AdminDisputesPage() {
  const session = await requireSession(["admin"]);
  const disputes = getAllDisputes();

  return (
    <AppShell user={session} title="Disputes" subtitle="Damage claims and adjudication">
      <div className="app-grid">
        {disputes.map((dispute) => (
          <Card key={dispute.id} title={dispute.id} subtitle={`Booking ${dispute.bookingId}`}>
            <p style={{ marginBottom: 16 }}>{dispute.description}</p>
            <Badge tone={dispute.status === "open" ? "red" : "green"}>{dispute.status}</Badge>
            {dispute.status === "open" ? (
              <div style={{ marginTop: 16 }}>
                <ResolveDisputeForm disputeId={dispute.id} />
              </div>
            ) : null}
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
