"use client";

import { ReactNode, useCallback, useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "@sendshorts/ui/button";

export const MIN_COLLAPSED_HEIGHT = 150;

export default function MobileExpandibleArea({
  children,
}: {
  children: ReactNode;
}) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = useCallback(() => setExpanded(!expanded), [expanded]);

  return (
    <div
      className={`block lg:hidden absolute shadow-t-lg border-t bottom-0  overflow-y-scroll bg-white z-[9999] w-full rounded-t-lg shadow-lg transition-all duration-300  ${expanded ? "h-[600px]" : `h-[150px]`}`}
    >
      <div className="flex justify-center">
        <Button variant="outline" size="icon" onClick={toggleExpand}>
          {expanded ? <ChevronDown size={24} /> : <ChevronUp size={24} />}
        </Button>
      </div>
      <div className={`w-full h-full p-4`}>{children}</div>
    </div>
  );
}
