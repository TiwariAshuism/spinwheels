import { Container, SoonPill } from "@spinwheels/ui";
import { WaitlistForm } from "@/features/waitlist/WaitlistForm";
import { driverTeaserStats } from "../data/content";

export function DriverTeaser() {
  return (
    <section className="driver-teaser anchor-section" id="drive">
      <Container className="driver-teaser-inner">
        <div className="driver-teaser-copy">
          <SoonPill />
          <h2>Drive your own cab on Spinwheels next.</h2>
          <p className="feature-lede driver-teaser-lede">
            A yellow-plate, driver-operated line is on the way — your own shifts, your own cab, 20%
            commission with 80% staying with you. Join the waitlist now and we&apos;ll reach out the
            moment it opens in Bengaluru.
          </p>
          <WaitlistForm
            className="driver-teaser-form"
            noteClassName="driver-teaser-form-note"
            defaultRole="driver"
            hideRoleSelect
            submitLabel="Notify me when it launches"
            pendingLabel="Saving..."
          />
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
