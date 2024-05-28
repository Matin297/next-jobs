"use client";

import { Button } from "@/components/ui";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="space-y-5 rounded border-2 border-red-600 p-4">
      <p className="text-red-600">{error.message}</p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
