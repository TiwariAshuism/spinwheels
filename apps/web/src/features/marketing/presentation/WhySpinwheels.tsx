import { Kicker, Container } from "@spinwheels/ui";
import { whyItems } from "../data/content";

export function WhySpinwheels() {
  return (
    <section className="why" id="why">
      <Container>
        <Kicker>Why Spinwheels</Kicker>
        <h2>Every detail here answers something that&apos;s broken elsewhere</h2>
        <div className="why-grid">
          {whyItems.map((item) => (
            <div key={item.title} className="why-card">
              <span className="why-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
