import * as React from "react";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 font-sans",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5",
        primary: "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5",
        outline: "border border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/30",
        ghost: "text-foreground-muted hover:text-white hover:bg-white/5",
        link: "underline-offset-4 hover:underline text-primary",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90"
      },
      size: {
        default: "h-12 px-8 text-base",
        sm: "h-9 px-4 text-sm",
        md: "h-12 px-8 text-base",
        lg: "h-14 px-10 text-lg",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type MotionProps = Omit<
  HTMLMotionProps<"button">,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "style"
>;

export interface ButtonProps
  extends MotionProps,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <motion.button
        whileTap={{ scale: 0.98 }}
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
