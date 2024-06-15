import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui";
import { ButtonProps } from "@/components/ui";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}

export default function LoadingButton({
  loading,
  disabled,
  children,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      {...props}
      className={cn("flex items-center justify-center gap-2", className)}
      type="submit"
      disabled={disabled || loading}
    >
      {loading && <Loader2 className="animate-spin" />}
      <span>{children}</span>
    </Button>
  );
}
