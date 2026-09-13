import {
  Container,
  Kicker,
  MotionInteractiveCard,
  MotionReveal,
  MotionStagger,
  MotionStaggerItem,
} from "@spinwheels/ui";
import { whyItems } from "../data/content";

export function WhySpinwheels() {
  return (
    <section className="why anchor-section" id="why">
      <Container>
        <div className="section-head">
          <Kicker>Why Spinwheels</Kicker>
          <MotionReveal direction="up">
            <h2>Every detail here answers something that&apos;s broken elsewhere</h2>
          </MotionReveal>
        </div>
        <MotionStagger className="why-grid">
          {whyItems.map((item) => (
            <MotionStaggerItem key={item.title}>
              <MotionInteractiveCard className="why-card interactive-card">
                <span className="why-icon">{item.icon}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </MotionInteractiveCard>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}
