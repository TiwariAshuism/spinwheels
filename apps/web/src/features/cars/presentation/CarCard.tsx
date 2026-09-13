import Link from "next/link";
import type { Car } from "@spinwheels/types";
import { Badge, Button, Card } from "@spinwheels/ui";

type CarCardProps = {
  car: Car;
};

export function CarCard({ car }: CarCardProps) {
  return (
    <Card className="car-card car-card-hover">
      <div className="car-card-head">
        <div>
          <h3>
            {car.make} {car.model}
          </h3>
          <div className="car-meta">
            <span>{car.year}</span>
            <span>{car.location}</span>
            <span>Trust {car.trustScore}</span>
          </div>
        </div>
        <div className="row-actions">
          {car.ev ? <Badge tone="green">EV</Badge> : null}
          {car.instantBooking ? <Badge tone="yellow">2hr pickup</Badge> : null}
        </div>
      </div>
      <p className="car-price">₹{car.pricePerDay.toLocaleString("en-IN")}/day</p>
      <Button href={`/cars/${car.id}`}>View & book</Button>
    </Card>
  );
}
