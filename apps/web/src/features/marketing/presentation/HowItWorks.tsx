import { Container, Kicker, MotionReveal, MotionStagger, MotionStaggerItem } from "@spinwheels/ui";
import { howSteps } from "../data/content";

export function HowItWorks() {
  return (
    <section className="how" id="how">
      <Container>
        <div className="section-head">
          <Kicker>How it works</Kicker>
          <MotionReveal direction="up">
            <h2>From search to drive, in four steps</h2>
          </MotionReveal>
        </div>
        <MotionStagger className="how-steps">
          {howSteps.flatMap((step, index) => {
            const nodes = [];
            if (index > 0) {
              nodes.push(
                <div key={`arrow-${step.title}`} className="how-arrow">
                  →
                </div>,
              );
            }
            nodes.push(
              <MotionStaggerItem key={step.title} className="how-step-wrap">
                <div className="how-step">
                  <div className="how-icon">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </MotionStaggerItem>,
            );
            return nodes;
          })}
        </MotionStagger>
      </Container>
    </section>
  );
}
