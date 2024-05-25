"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { JobStyle, JobType } from "@prisma/client";

const FilterJobsSchema = z.object({
  q: z.string().optional(),
  location: z.string().optional(),
  type: z.nativeEnum(JobType).optional(),
  style: z.nativeEnum(JobStyle).optional(),
});

export async function filterJobs(formData: FormData) {
  const values = Array.from(formData.entries()).filter(([_, value]) => value);
  const validationResult = FilterJobsSchema.safeParse(
    Object.fromEntries(values),
  );

  if (validationResult.success) {
    const data = validationResult.data;
    const searchParams = new URLSearchParams({});

    for (let [key, value] of Object.entries(data)) {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    }

    redirect(`/?${searchParams.toString()}`);
  }
}
