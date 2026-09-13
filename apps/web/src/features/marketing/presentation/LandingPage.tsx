import { ScrollReveal } from "@spinwheels/ui";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { Problem } from "./Problem";
import { HowItWorks } from "./HowItWorks";
import { WhySpinwheels } from "./WhySpinwheels";
import { InstantBooking } from "./InstantBooking";
import { DriverAddon } from "./DriverAddon";
import { GroupTrip } from "./GroupTrip";
import { Owners } from "./Owners";
import { EvSection } from "./EvSection";
import { Trust } from "./Trust";
import { DriverTeaser } from "./DriverTeaser";
import { FeaturedCars } from "./FeaturedCars";
import { WaitlistSection } from "@/features/waitlist/WaitlistSection";
import { Footer } from "./Footer";

export function LandingPage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ScrollReveal>
          <FeaturedCars />
        </ScrollReveal>
        <ScrollReveal>
          <Problem />
        </ScrollReveal>
        <ScrollReveal>
          <HowItWorks />
        </ScrollReveal>
        <ScrollReveal>
          <WhySpinwheels />
        </ScrollReveal>
        <ScrollReveal>
          <InstantBooking />
        </ScrollReveal>
        <ScrollReveal direction="left">
          <DriverAddon />
        </ScrollReveal>
        <ScrollReveal>
          <GroupTrip />
        </ScrollReveal>
        <ScrollReveal>
          <Owners />
        </ScrollReveal>
        <ScrollReveal>
          <EvSection />
        </ScrollReveal>
        <ScrollReveal>
          <Trust />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <DriverTeaser />
        </ScrollReveal>
        <ScrollReveal>
          <WaitlistSection />
        </ScrollReveal>
      </main>
      <Footer />
    </>
  );
}
