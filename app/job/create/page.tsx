import Link from "next/link";
import type { Metadata } from "next";
import { Button } from "@/components/ui";
import { ChevronLeft } from "lucide-react";
import CreateJobForm from "@/components/job/CreateJobForm";

export const metadata: Metadata = {
  title: "Post Job",
};

export default function CreateJobPage() {
  return (
    <>
      <Button variant="link" asChild>
        <Link href="/" className="flex items-center gap-2">
          <ChevronLeft size={16} />
          <span>Back</span>
        </Link>
      </Button>
      <h1 className="mb-5 text-center text-2xl font-bold">
        Job Post Information
      </h1>
      <CreateJobForm />
    </>
  );
}
