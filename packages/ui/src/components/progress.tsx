import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-6 w-full overflow-hidden rounded-full border border-2 shadow shadow-xl",
      className,
    )}
    {...props}
  >
    <div className="text-xs absolute left-1 text-center w-full text-black bottom-[0.4]  z-[9999]">
      {value || 0}%
    </div>
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-destructive rounded-xl transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
