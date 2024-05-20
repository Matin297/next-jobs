import Image from "next/image";
import { formatSalary, calcDateDistFromNow } from "@/lib/utils";
import { Briefcase, MapPin, Globe2, Banknote, Clock } from "lucide-react";
import CompanyLogoPlaceholder from "@/assets/company-logo-placeholder.png";

export default function JobItem() {
  return (
    <li>
      <article className="flex items-start gap-5 rounded border p-3 hover:bg-muted/30">
        <Image
          width={100}
          height={100}
          alt="company name"
          src={CompanyLogoPlaceholder}
        />
        <div>
          <div className="mb-5">
            <h2 className="text-lg font-bold">Job Title</h2>
            <h3 className="text-xs text-muted-foreground">Company Name</h3>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 sm:hidden">
              <Briefcase size={16} />
              <span>Job Type</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Job Style</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 size={16} />
              <span>Job Location</span>
            </div>
            <div className="flex items-center gap-2">
              <Banknote size={16} />
              <span>{formatSalary(1200000)}</span>
            </div>
            <div className="flex items-center gap-2 sm:hidden">
              <Clock size={16} />
              <span>{calcDateDistFromNow(new Date(2024, 3, 30))}</span>
            </div>
          </div>
        </div>

        <div className="ml-auto hidden flex-col justify-between self-stretch text-sm sm:flex">
          <div className="flex items-center gap-2 rounded border bg-muted p-2 text-muted-foreground">
            <Briefcase size={16} />
            <span>Job Type</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock size={16} />
            <span>{calcDateDistFromNow(new Date(2024, 3, 30))}</span>
          </div>
        </div>
      </article>
    </li>
  );
}
