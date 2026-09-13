import { Button, Container, SoonPill } from "@spinwheels/ui";
import { driverTeaserStats } from "../data/content";

export function DriverTeaser() {
  return (
    <section className="driver-teaser" id="drive">
      <Container className="driver-teaser-inner">
        <div className="driver-teaser-copy">
          <SoonPill />
          <h2>Drive your own cab on Spinwheels next.</h2>
          <p className="feature-lede">
            A yellow-plate, driver-operated line is on the way — your own shifts, your own cab, 20%
            commission with 80% staying with you. Join the waitlist now and we&apos;ll reach out the
            moment it opens in Bengaluru.
          </p>
          <Button href="#waitlist">Notify me when it launches</Button>
        </div>
        <div className="driver-teaser-stats">
          {driverTeaserStats.map((stat) => (
            <div key={stat.title} className="driver-teaser-stat">
              <span className="icon">{stat.icon}</span>
              <div className="txt">
                <strong>{stat.title}</strong>
                <span>{stat.description}</span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
