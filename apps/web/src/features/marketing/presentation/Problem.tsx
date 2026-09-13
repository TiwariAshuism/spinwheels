import { Container, Kicker, MotionReveal, MotionStagger, MotionStaggerItem } from "@spinwheels/ui";
import { problemItems } from "../data/content";

export function Problem() {
  return (
    <section className="problem">
      <Container>
        <div className="section-head">
          <Kicker>The problem</Kicker>
          <MotionReveal direction="up">
            <h2>Self-drive rentals in India have real demand — and a trust gap nobody&apos;s closed</h2>
          </MotionReveal>
        </div>
        <MotionStagger className="problem-grid">
          {problemItems.map((item) => (
            <MotionStaggerItem key={item.number}>
              <div className="problem-card">
                <span className="pnum">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </section>
  );
}
