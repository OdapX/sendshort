import { availableTransitions } from "./available-transitons.js";
import { slide } from "@remotion/transitions/slide";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { iris } from "@remotion/transitions/iris";
import { none } from "@remotion/transitions/none";
import { TransitionPresentation } from "@remotion/transitions";

export function presentationMapper({
  transitionName,
  width,
  height,
}: {
  transitionName: (typeof availableTransitions)[number];
  width: number;
  height: number;
}): TransitionPresentation<Record<string, unknown>> {
  switch (transitionName) {
    case "slide": {
      return slide({ direction: "from-right" });
    }
    case "clockWipe": {
      // TODO: fix internal remotion types
      return clockWipe({ width, height }) as unknown as TransitionPresentation<
        Record<string, unknown>
      >;
    }
    case "fade": {
      return fade();
    }
    case "wipe": {
      return wipe({ direction: "from-right" });
    }
    case "flip": {
      return flip({ direction: "from-right" });
    }
    case "iris": {
      // TODO: fix internal remotion types
      return iris({ width, height }) as unknown as TransitionPresentation<
        Record<string, unknown>
      >;
    }
    case "none": {
      return none();
    }
    default: {
      throw new Error("Unsupported transition name!");
    }
  }
}
