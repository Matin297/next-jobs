import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(salary: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(salary);
}

export function calcDateDistFromNow(date: Date) {
  return formatDistanceToNowStrict(date, { addSuffix: true });
}

export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
