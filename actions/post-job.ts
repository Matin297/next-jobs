"use server";

import { nanoid } from "nanoid";
import db from "@/prisma/client";
import { redirect } from "next/navigation";
import { generateSlug } from "@/lib/utils";
import { JobFieldsType, PostJobSchema } from "@/lib/schema";

export async function createJob(data: JobFieldsType) {
  const validationResult = PostJobSchema.parse(data);

  await db.job.create({
    data: {
      ...validationResult,
      salary: parseInt(validationResult.salary || "0"),
      slug: `${generateSlug(validationResult.title)}-${nanoid()}`,
    },
  });

  redirect("/job/success");
}
