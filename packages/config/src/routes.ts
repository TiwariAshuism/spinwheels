import type { NavLink, UserRole } from "@spinwheels/types";

export const RENTER_NAV: NavLink[] = [
  { href: "/search", label: "Search" },
  { href: "/trips", label: "Trips" },
  { href: "/payments", label: "Payments" },
  { href: "/profile", label: "Profile" },
];

export const OWNER_NAV: NavLink[] = [
  { href: "/owner/dashboard", label: "Dashboard" },
  { href: "/owner/cars", label: "Cars" },
  { href: "/owner/bookings", label: "Bookings" },
  { href: "/owner/earnings", label: "Earnings" },
  { href: "/owner/profile", label: "Profile" },
];

export const DRIVER_NAV: NavLink[] = [
  { href: "/driver/dashboard", label: "Dashboard" },
  { href: "/driver/trips", label: "Trips" },
  { href: "/driver/earnings", label: "Earnings" },
  { href: "/driver/profile", label: "Profile" },
];

export const ADMIN_NAV: NavLink[] = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/cars", label: "Cars" },
  { href: "/admin/bookings", label: "Bookings" },
  { href: "/admin/disputes", label: "Disputes" },
  { href: "/admin/payments", label: "Payments" },
  { href: "/admin/verification", label: "Verification" },
];

export const ROLE_NAV: Record<UserRole, NavLink[]> = {
  renter: RENTER_NAV,
  owner: OWNER_NAV,
  driver: DRIVER_NAV,
  admin: ADMIN_NAV,
};

export const ROLE_HOME: Record<UserRole, string> = {
  renter: "/search",
  owner: "/owner/dashboard",
  driver: "/driver/dashboard",
  admin: "/admin/dashboard",
};
