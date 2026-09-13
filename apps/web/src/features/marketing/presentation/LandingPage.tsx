import { MotionReveal } from "@spinwheels/ui";
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
        <MotionReveal direction="up">
          <FeaturedCars />
        </MotionReveal>
        <MotionReveal direction="up">
          <Problem />
        </MotionReveal>
        <HowItWorks />
        <WhySpinwheels />
        <MotionReveal direction="scale">
          <InstantBooking />
        </MotionReveal>
        <MotionReveal direction="left">
          <DriverAddon />
        </MotionReveal>
        <MotionReveal direction="up">
          <GroupTrip />
        </MotionReveal>
        <Owners />
        <MotionReveal direction="up">
          <EvSection />
        </MotionReveal>
        <MotionReveal direction="up">
          <Trust />
        </MotionReveal>
        <DriverTeaser />
        <WaitlistSection />
      </main>
      <Footer />
    </>
  );
}
