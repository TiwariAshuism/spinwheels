import { AppShell } from "@/components/layout/AppShell";
import { Badge, Card } from "@spinwheels/ui";
import { requireSession } from "@/lib/auth/require-session";
import { getAllUsers } from "@/lib/data";

export default async function AdminUsersPage() {
  const session = await requireSession(["admin"]);
  const users = getAllUsers();

  return (
    <AppShell user={session} title="Users" subtitle="Renters, owners, drivers, and admins">
      <Card>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Trust</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <Badge tone="neutral">{user.role}</Badge>
                </td>
                <td>{user.trustScore}</td>
                <td>{user.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </AppShell>
  );
}
