import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@spinwheels/ui";
import { CreateCarForm } from "@/features/cars/presentation/CreateCarForm";
import { requireSession } from "@/lib/auth/require-session";

export default async function OwnerNewCarPage() {
  const session = await requireSession(["owner"]);

  return (
    <AppShell user={session} title="List a car" subtitle="Add a verified vehicle to Spinwheels">
      <Card title="Car details">
        <CreateCarForm />
      </Card>
    </AppShell>
  );
}
