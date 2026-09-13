import { Button, Input, Select } from "@spinwheels/ui";

type CarSearchFormProps = {
  defaults?: {
    location?: string;
    evOnly?: boolean;
    maxPrice?: string;
  };
};

export function CarSearchForm({ defaults }: CarSearchFormProps) {
  return (
    <form className="app-grid app-grid-3" method="get">
      <Input label="Location" name="location" defaultValue={defaults?.location ?? ""} placeholder="Koramangala" />
      <Select label="Fuel type" name="evOnly" defaultValue={defaults?.evOnly ? "true" : ""}>
        <option value="">All cars</option>
        <option value="true">EV only</option>
      </Select>
      <Input
        label="Max price/day"
        name="maxPrice"
        type="number"
        defaultValue={defaults?.maxPrice ?? ""}
        placeholder="2500"
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
