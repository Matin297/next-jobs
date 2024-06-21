import db from "@/prisma/client";
import { cache } from "react";
import { JobsFilterOptionsType } from "@/actions";

export async function fetchLocations() {
  try {
    const locations = await db.location.findMany();
    return locations;
  } catch (error) {
    console.error(error);
    throw new Error("Server Error: Failed to fetch locations!");
  }
}

export async function fetchCompanies() {
  try {
    const companies = await db.company.findMany();
    return companies;
  } catch (error) {
    console.error(error);
    throw new Error("Server Error: Failed to fetch companies!");
  }
}

export type CustomJobType = Awaited<ReturnType<typeof fetchJobs>>[number];

type ExtendedJobsFilterOptionsType = JobsFilterOptionsType & {
  page?: number;
};

export const JOBS_PER_PAGE = 4;

export async function fetchJobs(
  filterOptions: ExtendedJobsFilterOptionsType = {},
) {
  const { location, q, type, style, page = 1 } = filterOptions;
  try {
    const jobs = await db.job.findMany({
      where: {
        status: "APPROVED",
        ...(type && { type }),
        ...(style && { style }),
        ...(location && { location: { id: location } }),
        ...(q && {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
            { applicationURL: { contains: q } },
            { applicationEmail: { contains: q } },
            { company: { name: { contains: q } } },
            { location: { city: { contains: q }, country: { contains: q } } },
          ],
        }),
      },
      take: JOBS_PER_PAGE,
      skip: (page - 1) * JOBS_PER_PAGE,
      select: {
        id: true,
        type: true,
        slug: true,
        style: true,
        title: true,
        salary: true,
        updatedAt: true,
        location: { select: { city: true, country: true } },
        company: { select: { logoURL: true, name: true } },
      },
    });
    return jobs;
  } catch (error) {
    console.error(error);
    throw new Error("Server Error: Failed to fetch jobs!");
  }
}

export async function countTotalFilteredJobsPages(
  filterOptions: JobsFilterOptionsType = {},
) {
  const { location, q, type, style } = filterOptions;
  try {
    const jobs = await db.job.findMany({
      where: {
        status: "APPROVED",
        ...(type && { type }),
        ...(style && { style }),
        ...(location && { location: { id: location } }),
        ...(q && {
          OR: [
            { title: { contains: q } },
            { description: { contains: q } },
            { applicationURL: { contains: q } },
            { applicationEmail: { contains: q } },
            { company: { name: { contains: q } } },
            { location: { city: { contains: q }, country: { contains: q } } },
          ],
        }),
      },
    });
    return Math.ceil(jobs.length / JOBS_PER_PAGE);
  } catch (error) {
    console.error(error);
    throw new Error("Server Error: Failed to fetch jobs!");
  }
}

export const fetchJobBySlug = cache(async function (slug: string) {
  try {
    const job = await db.job.findUnique({
      where: {
        slug,
        status: "APPROVED",
      },
      include: {
        company: {
          select: {
            name: true,
            logoURL: true,
          },
        },
        location: {
          select: {
            city: true,
            country: true,
          },
        },
      },
    });
    return job;
  } catch (error) {
    console.error(error);
    throw new Error("Server Error: Failed to fetch job details!");
  }
});
