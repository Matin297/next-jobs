"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui";
import { useSearchParams, usePathname } from "next/navigation";

interface CustomPaginationProps {
  pages: number;
}

export default async function CustomPagination({
  pages,
}: CustomPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  function createPageURL(pageNumber: number | null) {
    const params = new URLSearchParams(searchParams);

    if (pageNumber) {
      params.set("page", pageNumber.toString());
    } else {
      params.delete("page");
    }

    return `${pathname}?${params.toString()}`;
  }

  if (pages > 1)
    return (
      <Pagination>
        <PaginationContent>
          {page > 1 && (
            <PaginationItem>
              <PaginationPrevious href={createPageURL(page - 1)} />
            </PaginationItem>
          )}

          {page > 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationLink
              href={createPageURL(page)}
              className="rounded-full border bg-primary text-primary-foreground"
            >
              {page}
            </PaginationLink>
          </PaginationItem>

          {pages - page >= 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {page < pages && (
            <PaginationItem>
              <PaginationNext href={createPageURL(page + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    );

  return null;
}
