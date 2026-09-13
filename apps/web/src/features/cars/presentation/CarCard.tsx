import Link from "next/link";
import type { Car } from "@spinwheels/types";
import { Badge, ImageCarousel, MotionHover, MotionTilt } from "@spinwheels/ui";

type CarCardProps = {
  car: Car;
};

export function CarCard({ car }: CarCardProps) {
  const gallery = car.images.length > 0 ? car.images : [car.imageUrl];

  return (
    <MotionHover className="car-card-link-wrap">
      <MotionTilt className="car-card-tilt">
        <Link href={`/cars/${car.id}`} className="car-card-link">
          <article className="car-card">
            <div className="car-card-image">
              <ImageCarousel
                images={gallery}
                alt={`${car.make} ${car.model}`}
                sizes="(max-width: 920px) 100vw, (max-width: 1100px) 50vw, 33vw"
                variant="card"
                autoPlayMs={4500}
              />
              <div className="car-card-badges">
                {car.ev ? <Badge tone="green">EV</Badge> : null}
                {car.instantBooking ? <Badge tone="yellow">2hr pickup</Badge> : null}
              </div>
            </div>
            <div className="car-card-body">
              <div className="car-card-head">
                <h3>
                  {car.make} {car.model}
                </h3>
                <span className="car-rating">★ {car.rating}</span>
              </div>
              <div className="car-meta">
                <span>{car.year}</span>
                <span>{car.location}</span>
                <span>{car.transmission}</span>
                <span>{car.seats} seats</span>
              </div>
              <p className="car-card-desc">{car.description}</p>
              <div className="car-card-footer">
                <p className="car-price">
                  ₹{car.pricePerDay.toLocaleString("en-IN")}
                  <span>/day</span>
                </p>
                <span className="car-card-cta">View details</span>
              </div>
            </div>
          </article>
        </Link>
      </MotionTilt>
    </MotionHover>
  );
}
