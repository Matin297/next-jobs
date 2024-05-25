"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { useFormStatus } from "react-dom";
import { ButtonProps } from "@/components/ui";

export default function FormSubmitButton({
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      className={cn("flex items-center justify-center gap-2", className)}
      type="submit"
      disabled={disabled || pending}
    >
      {pending && <Loader2 className="animate-spin" />}
      <span>{children}</span>
    </Button>
  );
}
