import {
  mockBookings,
  mockCars,
  mockDisputes,
  mockPayments,
  mockTrips,
  mockUsers,
  mockVerifications,
} from "@spinwheels/config";

export function getCars(filters?: { location?: string; evOnly?: boolean; maxPrice?: number }) {
  return mockCars.filter((car) => {
    if (car.status !== "active") return false;
    if (filters?.location && !car.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters?.evOnly && !car.ev) return false;
    if (filters?.maxPrice && car.pricePerDay > filters.maxPrice) return false;
    return true;
  });
}

export function getCarById(id: string) {
  return mockCars.find((car) => car.id === id) ?? null;
}

export function getBookingById(id: string) {
  return mockBookings.find((booking) => booking.id === id) ?? null;
}

export function getBookingsForUser(userId: string, role: "renter" | "owner") {
  return mockBookings.filter((booking) =>
    role === "renter" ? booking.renterId === userId : booking.ownerId === userId,
  );
}

export function getTripsForUser(userId: string, role: "renter" | "driver") {
  if (role === "driver") {
    return mockTrips.filter((trip) => trip.driverId === userId);
  }
  const renterBookings = mockBookings.filter((b) => b.renterId === userId).map((b) => b.id);
  return mockTrips.filter((trip) => renterBookings.includes(trip.bookingId));
}

export function getPaymentsForUser(userId: string) {
  return mockPayments.filter((payment) => payment.userId === userId);
}

export function getOwnerCars(ownerId: string) {
  return mockCars.filter((car) => car.ownerId === ownerId);
}

export function getOwnerEarnings(ownerId: string) {
  return mockPayments.filter((p) => p.type === "payout" && mockBookings.some((b) => b.ownerId === ownerId && b.id === p.bookingId));
}

export function getDriverEarnings(driverId: string) {
  return mockPayments.filter((p) => p.userId === driverId && p.type === "payout");
}

export function getAllUsers() {
  return mockUsers;
}

export function getAllDisputes() {
  return mockDisputes;
}

export function getAllVerifications() {
  return mockVerifications;
}

export function getUserById(id: string) {
  return mockUsers.find((user) => user.id === id) ?? null;
}
