import { CarLottie } from "@/components/marketing/CarLottie";
import { Button, Container, Kicker } from "@spinwheels/ui";
import { instantSteps } from "../data/content";

export function InstantBooking() {
  return (
    <section className="feature feature-instant">
      <Container className="feature-grid">
        <div>
          <Kicker light>Headline feature</Kicker>
          <h2>Need a car right now? Get one within 2 hours.</h2>
          <p className="feature-lede">
            No advance booking, no waiting on a host to confirm. Last-minute weekend trip, airport
            run, or a plan that just came together — search, book, and pick up a verified car near
            you the same afternoon.
          </p>
          <Button href="#waitlist">Get early access</Button>
        </div>
        <div className="instant-visual">
          <CarLottie variant="instantBooking" className="instant-lottie" />
          <div className="instant-badge">
            <span className="instant-time">2:00</span>
            <span className="instant-label">hours to pickup</span>
          </div>
          <div className="instant-steps">
            {instantSteps.map((step) => (
              <div key={step.time} className="instant-step">
                <span>{step.time}</span> {step.label}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
