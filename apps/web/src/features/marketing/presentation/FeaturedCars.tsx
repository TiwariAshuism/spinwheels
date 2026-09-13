import Link from "next/link";
import { getCars } from "@/lib/data";
import { Badge, Button, ScrollReveal } from "@spinwheels/ui";

export function FeaturedCars() {
  const cars = getCars().slice(0, 3);

  return (
    <section className="featured-cars">
      <div className="wrap">
        <p className="kicker">Browse without signing in</p>
        <div className="featured-head">
          <h2>Verified cars ready to book in Bengaluru</h2>
          <Button href="/search">View all cars</Button>
        </div>
        <div className="featured-grid">
          {cars.map((car, index) => (
            <ScrollReveal key={car.id} delay={index * 90}>
              <article className="featured-card">
                <div className="featured-card-top">
                  <h3>
                    {car.make} {car.model}
                  </h3>
                  <p>
                    {car.location} · {car.year}
                  </p>
                </div>
                <div className="featured-card-meta">
                  {car.ev ? <Badge tone="green">EV</Badge> : null}
                  {car.instantBooking ? <Badge tone="yellow">2hr pickup</Badge> : null}
                  <span className="featured-price">₹{car.pricePerDay.toLocaleString("en-IN")}/day</span>
                </div>
                <Link href={`/cars/${car.id}`} className="featured-link">
                  View details →
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
