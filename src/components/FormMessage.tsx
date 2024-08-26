"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface FormMessageProps extends React.ComponentPropsWithoutRef<"p"> {
  invalid?: boolean;
}

const FormMessage = React.forwardRef<React.ElementRef<"p">, FormMessageProps>(
  ({ className, children, invalid, ...props }, ref) => {
    return (
      <p
        ref={ref}
        aria-invalid={invalid}
        className={cn(
          "text-sm font-medium text-zinc-500 aria-[invalid=true]:text-rose-500",
          className
        )}
        {...props}
      >
        {children}
      </p>
    );
  }
);

export { FormMessage };
