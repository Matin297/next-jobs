import JobItem from "./JobItem";
import { fetchJobs } from "@/lib/data";
import { JobsFilterOptionsType } from "@/actions";

interface JobsListProps {
  filterOptions: JobsFilterOptionsType;
}

export default async function JobsList({ filterOptions }: JobsListProps) {
  const jobs = await fetchJobs(filterOptions);

  if (jobs.length > 0) {
    return (
      <ul className="space-y-3">
        {jobs.map((job) => (
          <JobItem key={job.id} {...job} />
        ))}
      </ul>
    );
  }

  return (
    <div className="py-5 text-center">
      <h2 className="font-semibold">No Jobs Found :(</h2>
      <p className="text-muted-foreground">
        Adjust your filter options and try again.
      </p>
    </div>
  );
}
