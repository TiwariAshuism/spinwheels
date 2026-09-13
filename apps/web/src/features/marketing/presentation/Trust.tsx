import { Container, Kicker } from "@spinwheels/ui";
import { trustItems } from "../data/content";

export function Trust() {
  return (
    <section className="trust">
      <Container>
        <Kicker>Built on trust, not just reach</Kicker>
        <h2>Every safeguard exists because something specific was broken elsewhere</h2>
        <div className="trust-grid">
          {trustItems.map((item) => (
            <div key={item.title} className="trust-item">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
