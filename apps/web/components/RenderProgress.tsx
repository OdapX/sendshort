"use client";

import { Progress } from "@sendshorts/ui/progress";
import { useRenderProgress } from "../hooks/use-render-progress";
import { useStateStore } from "../store/state";

export default function RenderProgress({ videoId }: { videoId: string }) {
  useRenderProgress({ videoId });
  const renderProgress = useStateStore((state) => state.ui.data.renderProgress);

  return <Progress value={(renderProgress || 0) * 100} />;
}
