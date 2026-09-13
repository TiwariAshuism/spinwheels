import { Button, Container, MotionFloat, MotionHero, MotionPress, MotionReveal } from "@spinwheels/ui";
import { CarLottie } from "@/components/marketing/CarLottie";
import { SiteLink } from "@/components/layout/SiteLink";
import { HeroArt } from "./HeroArt";

export function Hero() {
  return (
    <section className="hero">
      <Container className="hero-grid">
        <MotionHero className="hero-copy">
          <MotionReveal direction="fade" delay={0}>
            <p className="eyebrow">Bengaluru · self-drive car rentals</p>
          </MotionReveal>
          <MotionReveal direction="up" delay={80}>
            <h1>Reliable, affordable self-drive cars — built for students &amp; young professionals</h1>
          </MotionReveal>
          <MotionReveal direction="up" delay={160}>
            <p className="lede">
              No hidden fees. No vanishing support. Get a car ready for pickup within{" "}
              <strong>2 hours</strong> of booking — no advance planning needed.
            </p>
          </MotionReveal>
          <MotionReveal direction="up" delay={240}>
            <div className="hero-ctas">
              <MotionPress>
                <Button href="/search">Browse cars</Button>
              </MotionPress>
              <MotionPress>
                <SiteLink href="/how-it-works" className="btn btn-outline-light">
                  See how it works
                </SiteLink>
              </MotionPress>
            </div>
          </MotionReveal>
        </MotionHero>
        <MotionFloat className="hero-art-wrap">
          <CarLottie className="hero-lottie" variant="hero" fallback={<HeroArt />} />
        </MotionFloat>
      </Container>
    </section>
  );
}
