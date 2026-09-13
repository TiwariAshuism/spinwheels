import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/PublicShell";
import { HowItWorksSteps } from "@/features/marketing/presentation/HowItWorksSteps";

export const metadata: Metadata = {
  title: "How it works — Spinwheels",
  description: "Search, book, verify, and drive — four simple steps to rent a verified self-drive car in Bengaluru.",
};

export default function HowItWorksPage() {
  return (
    <PublicShell
      title="How it works"
      subtitle="From search to drive, in four steps — full pricing upfront, no hidden fees."
    >
      <HowItWorksSteps />
    </PublicShell>
  );
}
