import { AppShell } from "@/components/layout/AppShell";
import { Card, Stat } from "@spinwheels/ui";
import { ProfileForm } from "@/features/profile/presentation/ProfileForm";
import { requireSession } from "@/lib/auth/require-session";

export default async function RenterProfilePage() {
  const session = await requireSession(["renter"]);

  return (
    <AppShell user={session} title="Profile" subtitle="Your account and trust score">
      <div className="app-grid app-grid-2">
        <Card title="Account details">
          <ProfileForm user={session} />
        </Card>
        <div className="app-grid">
          <Stat label="Trust score" value={String(session.trustScore)} />
          <Stat label="City" value={session.city} />
        </div>
      </div>
    </AppShell>
  );
}
