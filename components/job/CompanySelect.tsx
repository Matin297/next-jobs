"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Button,
  Popover,
  Command,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandInput,
  CommandGroup,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui";
import { cn } from "@/lib/utils";
import { Company } from "@prisma/client";
import { ChevronDown, CheckCheck } from "lucide-react";
import LogoPlaceholder from "@/assets/company-logo-placeholder.png";

interface CompanySelectProps {
  value?: string;
  companies: Company[];
  onChange: (value: string) => void;
}

export default function CompanySelect({
  companies,
  value,
  onChange,
}: CompanySelectProps) {
  const [open, setOpen] = useState(false);
  const selectedValue = companies.find((company) => company.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          role="combobox"
          variant="outline"
          className={cn("flex items-center justify-between pr-0", {
            "text-muted-foreground": !value,
          })}
        >
          <span>{selectedValue?.name || "Select an option"}</span>
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" align="start">
        <Command>
          <CommandInput placeholder="Search companies" />
          <CommandList>
            <CommandEmpty>No companies found.</CommandEmpty>
            <CommandGroup>
              {companies.map((company) => (
                <CommandItem
                  key={company.id}
                  value={company.name}
                  onSelect={() => {
                    onChange(company.id);
                    setOpen(false);
                  }}
                >
                  <Image
                    width={25}
                    className="mr-2"
                    alt={company.name}
                    src={company.logoURL || LogoPlaceholder}
                  />
                  <span>{company.name}</span>
                  <CheckCheck
                    className={cn("ml-auto text-green-600 opacity-0", {
                      "opacity-100": company.id === value,
                    })}
                    size={18}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
