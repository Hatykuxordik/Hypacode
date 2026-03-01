import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-border-focus focus-visible:ring-accent-glow/50 focus-visible:ring-[3px] aria-invalid:border-error aria-invalid:ring-error-muted",
  {
    variants: {
      variant: {
        default: "bg-accent text-text-on-accent shadow hover:bg-accent-hover",
        destructive:
          "bg-error text-text-on-accent shadow hover:bg-error/90 focus-visible:ring-error-muted dark:focus-visible:ring-error-muted dark:bg-error/60",
        outline:
          "border bg-bg-primary shadow hover:bg-accent-muted hover:text-text-primary dark:bg-bg-secondary/30 dark:border-border dark:hover:bg-bg-secondary/50",
        secondary:
          "bg-accent-secondary text-text-on-accent shadow hover:bg-accent-secondary/80",
        ghost:
          "hover:bg-accent-muted hover:text-text-primary dark:hover:bg-accent-muted/50",
        link: "text-accent underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 min-h-10 px-5 py-2 has-[>svg]:px-4",
        sm: "h-8 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-12 rounded-full px-6 has-[>svg]:px-5",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
