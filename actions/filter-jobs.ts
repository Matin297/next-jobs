"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { JobStyle, JobType } from "@prisma/client";

const FilterJobsSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.nativeEnum(JobType).optional().or(z.literal("")),
  style: z.nativeEnum(JobStyle).optional().or(z.literal("")),
});

export type JobsFilterOptionsType = z.infer<typeof FilterJobsSchema>;

export async function filterJobs(formData: FormData) {
  const searchParams = new URLSearchParams({});

  try {
    const data = FilterJobsSchema.parse(Object.fromEntries(formData.entries()));

    for (let [key, value] of Object.entries(data)) {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Validation Error: Job filters are invalid!");
  }

  redirect(`/?${searchParams.toString()}`);
}
