import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSalary(salary: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    style: "currency",
  }).format(salary);
}
