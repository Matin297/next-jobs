import Image from "next/image";
import { CustomJobType } from "@/lib/data";
import { formatSalary, calcDateDistFromNow } from "@/lib/utils";
import { Briefcase, MapPin, Globe2, Banknote, Clock } from "lucide-react";
import CompanyLogoPlaceholder from "@/assets/company-logo-placeholder.png";

export default function JobItem({
  type,
  title,
  style,
  salary,
  company,
  location,
  updatedAt,
}: CustomJobType) {
  return (
    <li>
      <article className="flex items-start gap-5 rounded border p-3 hover:bg-muted/30">
        <Image
          width={100}
          height={100}
          alt="company name"
          src={company.logoURL || CompanyLogoPlaceholder}
        />
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-bold">{title}</h2>
            <h3 className="text-xs text-muted-foreground">{company.name}</h3>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 sm:hidden">
              <Briefcase size={16} />
              <span>{type}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{style}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 size={16} />
              <span>{`${location.city}, ${location.country}`}</span>
            </div>
            <div className="flex items-center gap-2">
              <Banknote size={16} />
              <span>{salary ? formatSalary(salary) : "----"}</span>
            </div>
            <div className="flex items-center gap-2 sm:hidden">
              <Clock size={16} />
              <span>{calcDateDistFromNow(updatedAt)}</span>
            </div>
          </div>
        </div>

        <div className="ml-auto hidden flex-col justify-between self-stretch text-sm sm:flex">
          <div className="flex items-center gap-2 rounded border bg-muted p-2 text-muted-foreground">
            <Briefcase size={16} />
            <span>{type}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} />
            <span>{calcDateDistFromNow(updatedAt)}</span>
          </div>
        </div>
      </article>
    </li>
  );
}
