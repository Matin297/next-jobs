import db from "@/prisma/client";

export async function fetchLocations() {
  try {
    const locations = await db.location.findMany();
    return locations;
  } catch (error) {
    console.error(error);
    throw new Error("Server Error: Failed to fetch locations!");
  }
}
