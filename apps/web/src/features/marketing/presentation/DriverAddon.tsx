import { Container, Kicker, SoonPill } from "@spinwheels/ui";

export function DriverAddon() {
  return (
    <section className="feature feature-driver">
      <Container className="feature-grid feature-grid-reverse">
        <div className="driver-visual is-soon">
          <div className="toggle-demo">
            <span>Add a driver</span>
            <div className="toggle-track">
              <div className="toggle-dot" />
            </div>
          </div>
          <div className="driver-line">
            Driver fee <strong>₹200/hr</strong> — shown separately, never hidden in the total
          </div>
          <div className="soon-note">🕒 This option is coming soon — not yet available for booking</div>
        </div>
        <div>
          <SoonPill light />
          <Kicker>One tap, no app-switching</Kicker>
          <h2>Don&apos;t want to drive? Add a professional driver in one tap.</h2>
          <p className="feature-lede">
            A vetted, professional driver added to any eligible booking — right inside the same app
            you used to book the car. No separate cab app, no separate payment. The driver fee is
            always its own clear line item.
          </p>
        </div>
      </Container>
    </section>
  );
}
