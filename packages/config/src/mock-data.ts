import type { Booking, Car, Dispute, Payment, SessionUser, Trip, Verification } from "@spinwheels/types";

export const mockUsers: SessionUser[] = [
  {
    id: "user-renter",
    name: "Asha Kumar",
    email: "renter@spinwheels.in",
    role: "renter",
    phone: "9876543210",
    city: "Bengaluru",
    trustScore: 88,
  },
  {
    id: "user-owner",
    name: "Ravi Menon",
    email: "owner@spinwheels.in",
    role: "owner",
    phone: "9876543211",
    city: "Bengaluru",
    trustScore: 94,
  },
  {
    id: "user-driver",
    name: "Suresh Nair",
    email: "driver@spinwheels.in",
    role: "driver",
    phone: "9876543212",
    city: "Bengaluru",
    trustScore: 91,
  },
  {
    id: "user-admin",
    name: "Spinwheels Admin",
    email: "admin@spinwheels.in",
    role: "admin",
    phone: "9876543213",
    city: "Bengaluru",
    trustScore: 100,
  },
];

export const mockPassword = "spin123";

export const mockCars: Car[] = [
  {
    id: "car-1",
    ownerId: "user-owner",
    make: "Tata",
    model: "Nexon EV",
    year: 2023,
    pricePerDay: 1800,
    deposit: 5000,
    location: "Koramangala",
    registration: "KA-01-AB-1234",
    ev: true,
    trustScore: 92,
    rating: 4.8,
    instantBooking: true,
    status: "active",
    imageUrl:
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop&q=80",
    ],
    description:
      "Well-maintained Nexon EV with fast DC charging support, ideal for city runs and weekend getaways around Bengaluru.",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Electric",
    features: ["Fast charging", "GPS navigation", "Bluetooth", "Reverse camera", "Cruise control"],
  },
  {
    id: "car-2",
    ownerId: "user-owner",
    make: "Hyundai",
    model: "Creta",
    year: 2022,
    pricePerDay: 2200,
    deposit: 6000,
    location: "Indiranagar",
    registration: "KA-03-CD-5678",
    ev: false,
    trustScore: 89,
    rating: 4.6,
    instantBooking: true,
    status: "active",
    imageUrl:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1200&h=800&fit=crop&q=80",
    ],
    description:
      "Spacious Creta SUV with smooth highway manners, perfect for outstation trips to Mysore, Coorg, or the airport.",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Petrol",
    features: ["Sunroof", "Apple CarPlay", "Rear AC vents", "Parking sensors", "ABS + airbags"],
  },
  {
    id: "car-3",
    ownerId: "user-owner",
    make: "MG",
    model: "ZS EV",
    year: 2024,
    pricePerDay: 2000,
    deposit: 5500,
    location: "HSR Layout",
    registration: "KA-51-EF-9012",
    ev: true,
    trustScore: 95,
    rating: 4.9,
    instantBooking: false,
    status: "active",
    imageUrl:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1200&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&h=800&fit=crop&q=80",
    ],
    description:
      "Premium MG ZS EV with long range and a quiet cabin — a great way to try electric before you buy.",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Electric",
    features: ["Panoramic sunroof", "i-Smart connectivity", "360° camera", "Regenerative braking", "Premium audio"],
  },
  {
    id: "car-4",
    ownerId: "user-owner",
    make: "Maruti",
    model: "Swift",
    year: 2021,
    pricePerDay: 1400,
    deposit: 4000,
    location: "Whitefield",
    registration: "KA-05-GH-3456",
    ev: false,
    trustScore: 86,
    rating: 4.4,
    instantBooking: true,
    status: "active",
    imageUrl:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=900&h=600&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1494976388531-d105849445ff?w=1200&h=800&fit=crop&q=80",
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=800&fit=crop&q=80",
    ],
    description:
      "Compact and fuel-efficient Swift for tight city parking, short errands, and budget-friendly daily rentals.",
    transmission: "Manual",
    seats: 5,
    fuelType: "Petrol",
    features: ["Fuel efficient", "Compact size", "Touchscreen infotainment", "Power windows", "Central locking"],
  },
];

export const mockBookings: Booking[] = [
  {
    id: "booking-1",
    carId: "car-1",
    renterId: "user-renter",
    ownerId: "user-owner",
    startDate: "2026-09-15",
    endDate: "2026-09-17",
    totalAmount: 5400,
    deposit: 5000,
    status: "confirmed",
    addDriver: false,
    pickupNote: "Near Forum Mall entrance",
  },
  {
    id: "booking-2",
    carId: "car-2",
    renterId: "user-renter",
    ownerId: "user-owner",
    startDate: "2026-08-20",
    endDate: "2026-08-22",
    totalAmount: 6600,
    deposit: 6000,
    status: "completed",
    addDriver: false,
  },
  {
    id: "booking-3",
    carId: "car-3",
    renterId: "user-renter",
    ownerId: "user-owner",
    startDate: "2026-09-20",
    endDate: "2026-09-22",
    totalAmount: 6000,
    deposit: 5500,
    status: "pending",
    addDriver: false,
  },
];

export const mockTrips: Trip[] = [
  {
    id: "trip-1",
    bookingId: "booking-1",
    route: "Koramangala → Mysore",
    status: "scheduled",
    startTime: "2026-09-15T08:00:00",
  },
  {
    id: "trip-2",
    bookingId: "booking-2",
    driverId: "user-driver",
    route: "Indiranagar → Airport",
    status: "completed",
    startTime: "2026-08-20T06:00:00",
    endTime: "2026-08-20T07:30:00",
  },
];

export const mockPayments: Payment[] = [
  {
    id: "pay-1",
    bookingId: "booking-1",
    userId: "user-renter",
    amount: 10400,
    type: "charge",
    status: "completed",
    createdAt: "2026-09-10T10:00:00",
  },
  {
    id: "pay-2",
    bookingId: "booking-2",
    userId: "user-renter",
    amount: 6000,
    type: "refund",
    status: "completed",
    createdAt: "2026-08-25T14:00:00",
  },
  {
    id: "pay-3",
    bookingId: "booking-1",
    userId: "user-owner",
    amount: 4590,
    type: "payout",
    status: "pending",
    createdAt: "2026-09-12T09:00:00",
  },
];

export const mockDisputes: Dispute[] = [
  {
    id: "dispute-1",
    bookingId: "booking-2",
    raisedBy: "user-renter",
    description: "Minor scratch claimed at drop-off was not present in pickup photos.",
    status: "open",
  },
];

export const mockVerifications: Verification[] = [
  {
    id: "ver-1",
    userId: "user-renter",
    documentType: "license",
    documentNumber: "KA-0123456789",
    status: "approved",
  },
  {
    id: "ver-2",
    userId: "user-owner",
    documentType: "registration",
    documentNumber: "KA-01-AB-1234",
    status: "pending",
  },
];
