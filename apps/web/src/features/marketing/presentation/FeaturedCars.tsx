import { FeaturedCarsCarousel } from "@/features/cars/presentation/FeaturedCarsCarousel";
import { getCars } from "@/lib/data";
import { Button } from "@spinwheels/ui";

export function FeaturedCars() {
  const cars = getCars();

  return (
    <section className="featured-cars">
      <div className="wrap">
        <p className="kicker">Browse without signing in</p>
        <div className="featured-head">
          <h2>Verified cars ready to book in Bengaluru</h2>
          <Button href="/search">View all cars</Button>
        </div>
        <FeaturedCarsCarousel cars={cars} />
      </div>
    </section>
  );
}
