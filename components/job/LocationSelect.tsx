"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Button,
  Command,
  Popover,
  CommandItem,
  CommandList,
  CommandGroup,
  CommandEmpty,
  CommandInput,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui";
import { Location } from "@prisma/client";
import { ChevronDown, CheckCheck } from "lucide-react";

interface LocationSelectProps {
  value?: string;
  locations: Location[];
  onChange: (value: string) => void;
}

export default function LocationSelect({
  value,
  onChange,
  locations,
}: LocationSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedValue = locations.find(({ id }) => id === value);

  const getFormattedValue = (location?: (typeof locations)[number]) => {
    return location ? `${location?.city}, ${location?.country}` : "";
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          aria-expanded={open}
          variant="outline"
          role="combobox"
          className={cn("flex items-center justify-between pr-0", {
            "text-muted-foreground": !value,
          })}
        >
          {getFormattedValue(selectedValue) || "Select an option"}
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search location" />
          <CommandList>
            <CommandEmpty>No locations found.</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => {
                const { id } = location;
                const formattedValue = getFormattedValue(location);

                return (
                  <CommandItem
                    key={id}
                    value={formattedValue}
                    onSelect={() => {
                      onChange(id);
                      setOpen(false);
                    }}
                  >
                    {formattedValue}
                    <CheckCheck
                      size={18}
                      className={cn("ml-auto text-green-600 opacity-0", {
                        "opacity-100": value === id,
                      })}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
