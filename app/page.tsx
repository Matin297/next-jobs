import JobList from "@/components/home/JobsList";
import { JobsFilterOptionsType } from "@/actions";
import FilterBox from "@/components/home/FilterBox";

interface HomeProps {
  searchParams: JobsFilterOptionsType;
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <section className="space-y-5">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tighter">Tech Jobs</h1>
        <p className="text-muted-foreground">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <section className="flex flex-col gap-5 md:flex-row">
        <aside className="sticky top-2 h-fit rounded border bg-background p-4">
          <FilterBox defaultValues={searchParams} />
        </aside>
        <section className="grow space-y-2">
          <JobList filterOptions={searchParams} />
        </section>
      </section>
    </section>
  );
}
