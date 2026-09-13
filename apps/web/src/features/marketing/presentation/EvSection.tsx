import { Container, LottieAnimation } from "@spinwheels/ui";
import { marketingLotties } from "../lottie/assets";

export function EvSection() {
  return (
    <section className="ev">
      <Container className="ev-inner">
        <LottieAnimation
          className="ev-lottie"
          src={marketingLotties.ev}
          ariaLabel="Electric vehicle charging animation"
          fallback={<div className="ev-icon">⚡</div>}
        />
        <div>
          <h2>Try an EV before you buy one.</h2>
          <p>
            Bengaluru&apos;s charging density makes this the easiest city in India to test-drive
            electric for a weekend — priced below equivalent petrol hatchbacks and sedans, not above
            them.
          </p>
        </div>
      </Container>
    </section>
  );
}
