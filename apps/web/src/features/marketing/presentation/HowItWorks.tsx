import { Container, Kicker } from "@spinwheels/ui";
import { HowItWorksSteps } from "./HowItWorksSteps";

export function HowItWorks() {
  return (
    <section className="how anchor-section" id="how">
      <Container>
        <div className="section-head">
          <Kicker>How it works</Kicker>
          <h2>From search to drive, in four steps</h2>
        </div>
        <HowItWorksSteps />
      </Container>
    </section>
  );
}
