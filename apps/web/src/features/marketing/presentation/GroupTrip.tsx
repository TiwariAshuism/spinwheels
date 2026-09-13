import { Container, Kicker } from "@spinwheels/ui";
import { groupNotes } from "../data/content";

export function GroupTrip() {
  return (
    <section className="feature feature-group">
      <Container>
        <Kicker light>For outstation trips</Kicker>
        <h2>Going to Mysore with just 2 people? Get matched, split the cost 4 ways.</h2>
        <p className="feature-lede feature-lede-center">
          Post your outstation trip, and other renters heading the same way get matched into your
          booking — so more people means a lower cost per person, not a bigger bill.
        </p>
        <div className="group-visual">
          <div className="group-before">
            <p className="group-label">Just you two</p>
            <div className="group-avatars">
              <span>🧑</span>
              <span>🧑‍🦱</span>
            </div>
            <p className="group-price">
              ₹2,400 <span>per person</span>
            </p>
          </div>
          <div className="group-arrow">
            <span className="arrow-h">→ matched with 2 more →</span>
            <span className="arrow-v">↓ matched with 2 more ↓</span>
          </div>
          <div className="group-after">
            <p className="group-label">Full group of 4</p>
            <div className="group-avatars">
              <span>🧑</span>
              <span>🧑‍🦱</span>
              <span>👩</span>
              <span>🧔</span>
            </div>
            <p className="group-price group-price-good">
              ₹1,200 <span>per person</span>
            </p>
          </div>
        </div>
        <div className="group-notes">
          {groupNotes.map((note) => (
            <div key={note.text} className="group-note">
              <span>{note.icon}</span>
              {note.text}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
