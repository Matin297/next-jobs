import db from "@/prisma/client";
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

export async function fetchJobs(filterOptions: JobsFilterOptionsType = {}) {
  const { location, q, type, style } = filterOptions;
  try {
    const jobs = await db.job.findMany({
      where: {
        status: "APPROVED",
        ...(type && { type }),
        ...(style && { style }),
        ...(location && { location: { city: location } }),
        ...(q && {
          OR: [
            { title: { search: q } },
            { description: { search: q } },
            { applicationURL: { search: q } },
            { applicationEmail: { search: q } },
            { company: { name: { search: q } } },
            { location: { city: { search: q }, country: { search: q } } },
          ],
        }),
      },
      select: {
        id: true,
        type: true,
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
