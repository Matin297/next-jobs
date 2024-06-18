import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Button } from "@/components/ui";
import { notFound } from "next/navigation";
import { fetchJobBySlug } from "@/lib/data";
import Markdown from "@/components/common/Markdown";
import { formatSalary, calcDateDistFromNow } from "@/lib/utils";
import PlaceholderLogo from "@/assets/company-logo-placeholder.png";
import { Briefcase, MapPin, Globe2, Banknote, Clock } from "lucide-react";

interface JobDetailsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params: { slug },
}: JobDetailsPageProps): Promise<Metadata> {
  const job = await fetchJobBySlug(slug);

  if (!job) {
    return notFound();
  }
  return {
    title: job.title,
  };
}

export default async function JobDetailsPage({
  params: { slug },
}: JobDetailsPageProps) {
  const job = await fetchJobBySlug(slug);

  if (!job) {
    return notFound();
  }

  const {
    type,
    title,
    style,
    salary,
    company,
    location,
    updatedAt,
    description,
    applicationURL,
    applicationEmail,
  } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationURL;

  return (
    <section className="m-auto max-w-2xl space-y-5">
      <div className="flex flex-col items-center">
        <Image
          width={100}
          height={100}
          alt={company.name}
          src={company.logoURL || PlaceholderLogo}
        />
        <h1 className="text-xl font-semibold capitalize tracking-tighter">
          {title}
        </h1>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Briefcase size={16} />
          <span>{type}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{style}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe2 size={16} />
          <span className="whitespace-nowrap">{`${location.city}, ${location.country}`}</span>
        </div>
        {salary ? (
          <div className="flex items-center gap-2">
            <Banknote size={16} />
            <span>{formatSalary(salary)}</span>
          </div>
        ) : null}
        <div className="flex items-center gap-2">
          <Clock size={16} />
          <span className="whitespace-nowrap">
            {calcDateDistFromNow(updatedAt)}
          </span>
        </div>
      </div>

      <Markdown>{description}</Markdown>

      <Button asChild>
        <Link href={applicationLink!} target="_blank">
          Apply
        </Link>
      </Button>
    </section>
  );
}
