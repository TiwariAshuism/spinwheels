import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card } from "@spinwheels/ui";
import { VerificationForm } from "@/features/admin/presentation/VerificationForm";
import { requireSession } from "@/lib/auth/require-session";
import { getAllVerifications, getUserById } from "@/lib/data";

export default async function AdminVerificationPage() {
  const session = await requireSession(["admin"]);
  const verifications = getAllVerifications();

  return (
    <AppShell user={session} title="Verification" subtitle="License and vehicle document review">
      <div className="app-grid app-grid-2">
        {verifications.map((item) => {
          const user = getUserById(item.userId);
          return (
            <Card
              key={item.id}
              title={item.documentType}
              subtitle={user?.name ?? item.userId}
            >
              <div className="detail-list">
                <div className="detail-row">
                  <span>Document</span>
                  <span>{item.documentNumber}</span>
                </div>
                <div className="detail-row">
                  <span>Status</span>
                  <span>
                    <Badge tone={item.status === "approved" ? "green" : item.status === "rejected" ? "red" : "yellow"}>
                      {item.status}
                    </Badge>
                  </span>
                </div>
              </div>
              {item.status === "pending" ? (
                <div style={{ marginTop: 16 }}>
                  <VerificationForm
                    userId={item.userId}
                    documentType={item.documentType}
                    documentNumber={item.documentNumber}
                  />
                </div>
              ) : null}
            </Card>
          );
        })}
      </div>
    </AppShell>
  );
}
