"use client";

import { useFormStatus } from "react-dom";
import { ButtonProps } from "@/components/ui";
import LoadingButton from "@/components/common/LoadingButton";

export default function FormSubmitButton({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <LoadingButton {...props} type="submit" loading={pending}>
      {children}
    </LoadingButton>
  );
}
