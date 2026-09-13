import { Button, Container } from "@spinwheels/ui";
import { HeroArt } from "./HeroArt";

export function Hero() {
  return (
    <section className="hero">
      <Container className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Bengaluru · self-drive car rentals</p>
          <h1>Reliable, affordable self-drive cars — built for students &amp; young professionals</h1>
          <p className="lede">
            No hidden fees. No vanishing support. Get a car ready for pickup within{" "}
            <strong>2 hours</strong> of booking — no advance planning needed.
          </p>
          <div className="hero-ctas">
          <Button href="/search">Browse cars</Button>
          <Button href="#how" variant="outline-light">
            See how it works
          </Button>
          </div>
        </div>
        <HeroArt />
      </Container>
    </section>
  );
}
