"use client";

import { Input, Select } from "@spinwheels/ui";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type CarSearchFormProps = {
  defaults?: {
    location?: string;
    evOnly?: boolean;
    maxPrice?: string;
  };
};

type FilterState = {
  location: string;
  evOnly: string;
  maxPrice: string;
};

function buildSearchUrl(filters: FilterState) {
  const params = new URLSearchParams();
  const location = filters.location.trim();
  const maxPrice = filters.maxPrice.trim();

  if (location) params.set("location", location);
  if (filters.evOnly === "true") params.set("evOnly", "true");
  if (maxPrice) params.set("maxPrice", maxPrice);

  const query = params.toString();
  return query ? `/search?${query}` : "/search";
}

export function CarSearchForm({ defaults }: CarSearchFormProps) {
  const router = useRouter();
  const debounceRef = useRef<number | undefined>(undefined);
  const [filters, setFilters] = useState<FilterState>({
    location: defaults?.location ?? "",
    evOnly: defaults?.evOnly ? "true" : "",
    maxPrice: defaults?.maxPrice ?? "",
  });

  const applyFilters = useCallback(
    (next: FilterState) => {
      router.replace(buildSearchUrl(next), { scroll: false });
    },
    [router],
  );

  const scheduleApply = useCallback(
    (next: FilterState) => {
      window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => applyFilters(next), 350);
    },
    [applyFilters],
  );

  useEffect(() => {
    setFilters({
      location: defaults?.location ?? "",
      evOnly: defaults?.evOnly ? "true" : "",
      maxPrice: defaults?.maxPrice ?? "",
    });
  }, [defaults?.evOnly, defaults?.location, defaults?.maxPrice]);

  useEffect(() => {
    return () => window.clearTimeout(debounceRef.current);
  }, []);

  const updateField = (key: keyof FilterState, value: string, immediate = false) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    if (immediate) {
      window.clearTimeout(debounceRef.current);
      applyFilters(next);
      return;
    }
    scheduleApply(next);
  };

  const hasFilters = Boolean(filters.location.trim() || filters.evOnly === "true" || filters.maxPrice.trim());

  return (
    <div className="car-search-panel">
      <div className="car-search-panel-head">
        <p className="car-search-panel-title">Filter cars</p>
        {hasFilters ? (
          <Link href="/search" className="car-search-clear">
            Clear filters
          </Link>
        ) : (
          <span className="car-search-hint">Updates as you type</span>
        )}
      </div>
      <div className="car-search-form">
        <Input
          label="Location"
          name="location"
          value={filters.location}
          onChange={(event) => updateField("location", event.target.value)}
          placeholder="Koramangala"
        />
        <Select
          label="Fuel type"
          name="evOnly"
          value={filters.evOnly}
          onChange={(event) => updateField("evOnly", event.target.value, true)}
        >
          <option value="">All cars</option>
          <option value="true">EV only</option>
        </Select>
        <Input
          label="Max price/day"
          name="maxPrice"
          type="number"
          min={0}
          value={filters.maxPrice}
          onChange={(event) => updateField("maxPrice", event.target.value)}
          placeholder="2500"
        />
      </div>
    </div>
  );
}
