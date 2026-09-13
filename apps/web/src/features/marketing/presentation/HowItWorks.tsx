import { Kicker, Container } from "@spinwheels/ui";
import { howSteps } from "../data/content";

export function HowItWorks() {
  return (
    <section className="how" id="how">
      <Container>
        <Kicker>How it works</Kicker>
        <h2>From search to drive, in four steps</h2>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-icon">{howSteps[0].icon}</div>
            <h3>{howSteps[0].title}</h3>
            <p>{howSteps[0].description}</p>
          </div>
          <div className="how-arrow">→</div>
          <div className="how-step">
            <div className="how-icon">{howSteps[1].icon}</div>
            <h3>{howSteps[1].title}</h3>
            <p>{howSteps[1].description}</p>
          </div>
          <div className="how-arrow">→</div>
          <div className="how-step">
            <div className="how-icon">{howSteps[2].icon}</div>
            <h3>{howSteps[2].title}</h3>
            <p>{howSteps[2].description}</p>
          </div>
          <div className="how-arrow">→</div>
          <div className="how-step">
            <div className="how-icon">{howSteps[3].icon}</div>
            <h3>{howSteps[3].title}</h3>
            <p>{howSteps[3].description}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
