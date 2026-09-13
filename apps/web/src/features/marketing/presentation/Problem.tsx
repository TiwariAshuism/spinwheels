import { Kicker, Container } from "@spinwheels/ui";
import { problemItems } from "../data/content";

export function Problem() {
  return (
    <section className="problem">
      <Container>
        <Kicker>The problem</Kicker>
        <h2>Self-drive rentals in India have real demand — and a trust gap nobody&apos;s closed</h2>
        <div className="problem-grid">
          {problemItems.map((item) => (
            <div key={item.number} className="problem-card">
              <span className="pnum">{item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
