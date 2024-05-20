import JobItem from "@/components/Jobs/JobItem";

export default function Home() {
  return (
    <section className="space-y-5">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tighter">Tech Jobs</h1>
        <p className="text-muted-foreground">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        </p>
      </div>
      <ul className="space-y-3">
        <JobItem />
        <JobItem />
        <JobItem />
        <JobItem />
        <JobItem />
      </ul>
    </section>
  );
}
