import { Button, Container, Kicker, MotionReveal, MotionStagger, MotionStaggerItem } from "@spinwheels/ui";
import { ownerStats } from "../data/content";

export function Owners() {
  return (
    <section className="owners" id="owners">
      <Container className="owners-grid">
        <div className="owners-copy">
          <div className="section-head section-head-compact">
            <Kicker light>For car owners</Kicker>
            <MotionReveal direction="up">
              <h2>Your car earns while it&apos;s sitting idle anyway.</h2>
            </MotionReveal>
          </div>
          <MotionReveal direction="up" delay={80}>
            <p className="feature-lede owners-lede">
              List your car and keep more of what it earns — 15% commission, not the ~40% you might be
              used to. Fast weekly payouts, photo-evidenced handoffs, and a support line that actually
              answers.
            </p>
          </MotionReveal>
          <MotionReveal direction="up" delay={140}>
            <Button href="#waitlist">List your car</Button>
          </MotionReveal>
        </div>
        <MotionStagger className="owners-stats">
          {ownerStats.map((stat) => (
            <MotionStaggerItem key={stat.label}>
              <div className="owner-stat">
                <b>{stat.value}</b>
                <span>{stat.label}</span>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}
