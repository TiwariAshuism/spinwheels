import { Container, Kicker } from "@spinwheels/ui";
import { WaitlistForm } from "./WaitlistForm";

export function WaitlistSection() {
  return (
    <section className="waitlist anchor-section" id="waitlist">
      <Container className="waitlist-inner">
        <Kicker light>Get early access</Kicker>
        <h2>Be first in line when Spinwheels launches in Bengaluru</h2>
        <p className="feature-lede feature-lede-center">
          Renters and car owners both welcome — tell us which you are, and we&apos;ll reach out as
          soon as your neighborhood goes live.
        </p>
        <WaitlistForm />
      </Container>
    </section>
  );
}
