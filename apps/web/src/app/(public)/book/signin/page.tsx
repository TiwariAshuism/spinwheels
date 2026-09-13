import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { QuickBookForm } from "@/features/auth/QuickBookForm";
import { getCarById } from "@/lib/data";

export const metadata: Metadata = {
  title: "Continue booking — Spinwheels",
  description: "Confirm your booking with name, phone, and email only.",
};

export const dynamic = "force-dynamic";

type BookSignInPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BookSignInPage({ searchParams }: BookSignInPageProps) {
  const params = await searchParams;
  const carId = typeof params.carId === "string" ? params.carId : "";
  const startDate = typeof params.startDate === "string" ? params.startDate : "";
  const endDate = typeof params.endDate === "string" ? params.endDate : "";
  const pickupNote = typeof params.pickupNote === "string" ? params.pickupNote : undefined;

  if (!carId || !startDate || !endDate) {
    redirect("/search");
  }

  const car = getCarById(carId);
  if (!car) redirect("/search");

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Almost there</h1>
        <p>
          Book the {car.make} {car.model} — just name, phone, and email to continue.
        </p>
        <QuickBookForm
          carId={carId}
          startDate={startDate}
          endDate={endDate}
          pickupNote={pickupNote}
        />
        <p className="auth-switch">
          <Link href={`/cars/${carId}`}>Back to car details</Link>
        </p>
      </div>
    </div>
  );
}
