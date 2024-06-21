import JobItem from "./JobItem";
import { JobsFilterOptionsType } from "@/actions";
import CustomPagination from "@/components/common/Pagination";
import { fetchJobs, countTotalFilteredJobsPages } from "@/lib/data";

interface JobsListProps {
  filterOptions: JobsFilterOptionsType;
}

export default async function JobsList({ filterOptions }: JobsListProps) {
  const [jobs, totalPages] = await Promise.all([
    fetchJobs(filterOptions),
    countTotalFilteredJobsPages(filterOptions),
  ]);

  if (totalPages > 1) {
    return (
      <>
        <ul className="space-y-3">
          {jobs.map((job) => (
            <JobItem key={job.id} {...job} />
          ))}
        </ul>
        <CustomPagination pages={totalPages} />
      </>
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
