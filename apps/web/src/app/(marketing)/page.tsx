import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@spinwheels/config";
import { LandingPage } from "@/features/marketing/presentation/LandingPage";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Self-drive car rentals in Bengaluru`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
  },
};

export default function HomePage() {
  return <LandingPage />;
}
