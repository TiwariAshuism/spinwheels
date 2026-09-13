import { AppShell } from "@/components/layout/AppShell";
import { Card, Stat } from "@spinwheels/ui";
import { ProfileForm } from "@/features/profile/presentation/ProfileForm";
import { requireSession } from "@/lib/auth/require-session";

export default async function DriverProfilePage() {
  const session = await requireSession(["driver"]);

  return (
    <AppShell user={session} title="Profile" subtitle="Driver account and verification">
      <div className="app-grid app-grid-2">
        <Card title="Account details">
          <ProfileForm user={session} />
        </Card>
        <Stat label="Trust score" value={String(session.trustScore)} />
      </div>
    </AppShell>
  );
}
