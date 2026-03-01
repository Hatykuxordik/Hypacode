import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-border-focus focus-visible:ring-accent-glow/50 focus-visible:ring-[3px] aria-invalid:border-error aria-invalid:ring-error-muted transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-accent text-text-on-accent [a&]:hover:bg-accent-hover",
        secondary:
          "border-transparent bg-accent-secondary text-text-on-accent [a&]:hover:bg-accent-secondary/90",
        destructive:
          "border-transparent bg-error text-text-on-accent [a&]:hover:bg-error/90 focus-visible:ring-error-muted dark:focus-visible:ring-error-muted",
        outline:
          "text-text-primary border-border-strong [a&]:hover:bg-accent-muted [a&]:hover:text-text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
