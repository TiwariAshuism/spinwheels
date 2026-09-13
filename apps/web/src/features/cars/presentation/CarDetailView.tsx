import type { Car } from "@spinwheels/types";
import { Badge, Card, ImageCarousel } from "@spinwheels/ui";

type CarDetailViewProps = {
  car: Car;
};

export function CarDetailView({ car }: CarDetailViewProps) {
  const gallery = car.images.length > 0 ? car.images : [car.imageUrl];

  return (
    <div className="car-detail">
      <div className="car-detail-gallery">
        <ImageCarousel
          images={gallery}
          alt={`${car.make} ${car.model}`}
          priority
          sizes="(max-width: 920px) 100vw, 60vw"
          variant="hero"
          autoPlayMs={5500}
        />
      </div>

      <Card title={`${car.make} ${car.model}`} subtitle={`${car.year} · ${car.location}`}>
        <p className="car-detail-desc">{car.description}</p>
        <div className="row-actions" style={{ margin: "16px 0" }}>
          {car.ev ? <Badge tone="green">EV</Badge> : null}
          {car.instantBooking ? <Badge tone="yellow">2hr pickup</Badge> : null}
          <Badge tone="neutral">{car.status}</Badge>
        </div>
        <div className="detail-list">
          <div className="detail-row">
            <span>Price per day</span>
            <span>₹{car.pricePerDay.toLocaleString("en-IN")}</span>
          </div>
          <div className="detail-row">
            <span>Security deposit</span>
            <span>₹{car.deposit.toLocaleString("en-IN")}</span>
          </div>
          <div className="detail-row">
            <span>Fuel type</span>
            <span>{car.fuelType}</span>
          </div>
          <div className="detail-row">
            <span>Transmission</span>
            <span>{car.transmission}</span>
          </div>
          <div className="detail-row">
            <span>Seats</span>
            <span>{car.seats}</span>
          </div>
          <div className="detail-row">
            <span>Trust score</span>
            <span>{car.trustScore}</span>
          </div>
          <div className="detail-row">
            <span>Rating</span>
            <span>{car.rating} / 5</span>
          </div>
          <div className="detail-row">
            <span>Registration</span>
            <span>{car.registration}</span>
          </div>
        </div>
        <div className="car-features">
          <h4>Features & amenities</h4>
          <ul>
            {car.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}
