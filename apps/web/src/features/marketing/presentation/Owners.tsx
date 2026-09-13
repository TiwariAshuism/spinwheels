import { Button, Container, Kicker } from "@spinwheels/ui";
import { ownerStats } from "../data/content";

export function Owners() {
  return (
    <section className="owners" id="owners">
      <Container className="owners-grid">
        <div>
          <Kicker light>For car owners</Kicker>
          <h2>Your car earns while it&apos;s sitting idle anyway.</h2>
          <p className="feature-lede">
            List your car and keep more of what it earns — 15% commission, not the ~40% you might be
            used to. Fast weekly payouts, photo-evidenced handoffs, and a support line that actually
            answers.
          </p>
          <Button href="#waitlist">List your car</Button>
        </div>
        <div className="owners-stats">
          {ownerStats.map((stat) => (
            <div key={stat.label} className="owner-stat">
              <b>{stat.value}</b>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
