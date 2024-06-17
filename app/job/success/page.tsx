import Link from "next/link";
import { Button } from "@/components/ui";
import { CheckCircle, ChevronRight } from "lucide-react";

export default function JobCreateSuccess() {
  return (
    <div className="space-y-4 text-center">
      <CheckCircle size={50} className="m-auto text-green-600" />
      <div>
        <h2 className="text-2xl font-bold tracking-tighter">
          <span>Job Created Successfully</span>
        </h2>
        <p>
          Your job post has been created successfully and is pending approval.
        </p>
      </div>
      <Button asChild>
        <Link href="/" className="flex items-center gap-2">
          <span>Home</span>
          <ChevronRight size={16} />
        </Link>
      </Button>
    </div>
  );
}
