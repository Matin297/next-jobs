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
import { ChevronDown, CheckCheck } from "lucide-react";

interface ComboSelectProps<T> {
  data: T[];
  value?: string;
  onChange: (value: string) => void;
  getDisplayValue: (item?: T) => string;
}

export default function ComboSelect<T extends { id: string }>({
  data,
  value,
  onChange,
  getDisplayValue,
}: ComboSelectProps<T>) {
  const [open, setOpen] = useState(false);

  const selectedValue = data.find(({ id }) => id === value);

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
          {getDisplayValue(selectedValue) || "Select an option"}
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search location" />
          <CommandList>
            <CommandEmpty>No Results!</CommandEmpty>
            <CommandGroup>
              {data.map((item) => {
                const { id } = item;

                const formattedValue = getDisplayValue(item);
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
