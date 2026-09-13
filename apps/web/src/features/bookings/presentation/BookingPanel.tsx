import Link from "next/link";
import type { SessionUser } from "@spinwheels/types";
import { Button, Card } from "@spinwheels/ui";
import { CreateBookingForm } from "./CreateBookingForm";

type BookingPanelProps = {
  carId: string;
  session: SessionUser | null;
  defaults?: {
    startDate?: string;
    endDate?: string;
    pickupNote?: string;
  };
};

export function BookingPanel({ carId, session, defaults }: BookingPanelProps) {
  if (session?.role === "renter") {
    return (
      <Card title="Book this car" subtitle="Total cost shown before payment">
        <CreateBookingForm carId={carId} defaults={defaults} />
      </Card>
    );
  }

  return (
    <Card title="Book this car" subtitle="Pick dates first — sign in only when you're ready to confirm">
      <form className="auth-form" action={`/book/signin`} method="get">
        <input type="hidden" name="carId" value={carId} />
        <label className="field">
          <span className="field-label">Start date</span>
          <input
            className="field-input"
            name="startDate"
            type="date"
            required
            defaultValue={defaults?.startDate}
          />
        </label>
        <label className="field">
          <span className="field-label">End date</span>
          <input
            className="field-input"
            name="endDate"
            type="date"
            required
            defaultValue={defaults?.endDate}
          />
        </label>
        <label className="field">
          <span className="field-label">Pickup note</span>
          <input
            className="field-input"
            name="pickupNote"
            placeholder="Near Forum Mall entrance"
            defaultValue={defaults?.pickupNote}
          />
        </label>
        <Button type="submit">Continue to book</Button>
      </form>
      <p className="auth-hint" style={{ marginTop: 12 }}>
        Already have an account? <Link href="/login">Sign in</Link>
      </p>
    </Card>
  );
}
