"use client";

import { Input, Select } from "@spinwheels/ui";
import Link from "next/link";
import { useRef } from "react";

type CarSearchFormProps = {
  defaults?: {
    location?: string;
    evOnly?: boolean;
    maxPrice?: string;
  };
};

export function CarSearchForm({ defaults }: CarSearchFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  const queueSubmit = () => {
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      formRef.current?.requestSubmit();
    }, 350);
  };

  const hasFilters = Boolean(
    (defaults?.location ?? "").trim() ||
      defaults?.evOnly ||
      (defaults?.maxPrice ?? "").trim(),
  );

  return (
    <form ref={formRef} action="/search" method="get" className="car-search-panel">
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
          defaultValue={defaults?.location ?? ""}
          onChange={queueSubmit}
          placeholder="Koramangala"
        />
        <Select
          label="Fuel type"
          name="evOnly"
          defaultValue={defaults?.evOnly ? "true" : ""}
          onChange={(event) => {
            if (event.target.value === "") {
              event.target.removeAttribute("name");
            } else {
              event.target.setAttribute("name", "evOnly");
            }
            formRef.current?.requestSubmit();
          }}
        >
          <option value="">All cars</option>
          <option value="true">EV only</option>
        </Select>
        <Input
          label="Max price/day"
          name="maxPrice"
          type="number"
          min={0}
          defaultValue={defaults?.maxPrice ?? ""}
          onChange={queueSubmit}
          placeholder="2500"
        />
      </div>
    </form>
  );
}
