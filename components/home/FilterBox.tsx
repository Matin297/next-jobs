import { fetchLocations } from "@/lib/data";
import { JobType, JobStyle } from "@prisma/client";
import { filterJobs, JobsFilterOptionsType } from "@/actions";
import { Label, Input, Select } from "@/components/ui";
import FormSubmitButton from "@/components/common/FormSubmitButton";

interface FilterBoxProps {
  defaultValues: JobsFilterOptionsType;
}

export default async function FilterBox({ defaultValues }: FilterBoxProps) {
  const { q = "", location = "", style = "", type = "" } = defaultValues;
  const locations = await fetchLocations();

  return (
    <form action={filterJobs} className="flex flex-col gap-3">
      <h2 className="text-lg font-semibold">Filters</h2>
      <div className="space-y-1">
        <Label htmlFor="query">Search</Label>
        <Input
          name="q"
          id="query"
          defaultValue={q}
          placeholder="Title, Company, etc."
        />
      </div>
      {locations.length > 0 && (
        <div className="space-y-1">
          <Label htmlFor="location">Location</Label>
          <Select id="location" name="location" defaultValue={location}>
            <option value="">All</option>
            {locations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
            <option value="location1">Location1</option>
          </Select>
        </div>
      )}
      <div className="space-y-1">
        <Label htmlFor="type">Type</Label>
        <Select id="type" name="type" defaultValue={type}>
          <option value="">All</option>
          {Object.values(JobType).map((type) => (
            <option key={type} className="capitalize" value={type}>
              {type}
            </option>
          ))}
        </Select>
      </div>
      <div className="space-y-1">
        <Label htmlFor="style">Style</Label>
        <Select id="style" name="style" defaultValue={style}>
          <option value="">All</option>
          {Object.values(JobStyle).map((style) => (
            <option key={style} className="capitalize" value={style}>
              {style}
            </option>
          ))}
        </Select>
      </div>
      <FormSubmitButton>Apply</FormSubmitButton>
    </form>
  );
}
