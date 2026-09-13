export type UserRole = "renter" | "owner" | "driver" | "admin";

export type WaitlistRole = "renter" | "owner" | "driver";

export type NavLink = {
  href: string;
  label: string;
};

export type WaitlistEntry = {
  name: string;
  phone: string;
  role: WaitlistRole;
};

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  city: string;
  trustScore: number;
};

export type Car = {
  id: string;
  ownerId: string;
  make: string;
  model: string;
  year: number;
  pricePerDay: number;
  deposit: number;
  location: string;
  registration: string;
  ev: boolean;
  trustScore: number;
  rating: number;
  instantBooking: boolean;
  status: "active" | "pending" | "inactive";
};

export type BookingStatus = "pending" | "confirmed" | "active" | "completed" | "cancelled";

export type Booking = {
  id: string;
  carId: string;
  renterId: string;
  ownerId: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  deposit: number;
  status: BookingStatus;
  addDriver: boolean;
  pickupNote?: string;
};

export type Trip = {
  id: string;
  bookingId: string;
  driverId?: string;
  route: string;
  status: "scheduled" | "in_progress" | "completed";
  startTime: string;
  endTime?: string;
};

export type Payment = {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  type: "charge" | "refund" | "payout";
  status: "pending" | "completed" | "failed";
  createdAt: string;
};

export type Dispute = {
  id: string;
  bookingId: string;
  raisedBy: string;
  description: string;
  status: "open" | "resolved";
  resolution?: string;
};

export type Verification = {
  id: string;
  userId: string;
  documentType: "license" | "registration" | "insurance";
  documentNumber: string;
  status: "pending" | "approved" | "rejected";
};
