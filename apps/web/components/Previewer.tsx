"use client";

import { Player, PlayerRef } from "@sendshorts/remotion/player";
import Ugc from "@sendshorts/remotion/Ugc";
import { useStateStore } from "../store/state";
import { useIsMobile } from "@sendshorts/ui/hooks";
import { FPS, UGC_HOOK_DURATION_IN_FRAMES } from "@sendshorts/remotion/config";
import { useMemo } from "react";

export default function Previewer() {
  const playerRef = useStateStore((state) => state.ui.data.playerRef);
  const hookData = useStateStore((state) => state.hook.data);
  const footageData = useStateStore((state) => state.footage.data);
  const captionsData = useStateStore((state) => state.captions.data);
  const isMobile = useIsMobile();

  const totalVideoDuration = useMemo(
    () => UGC_HOOK_DURATION_IN_FRAMES + footageData.durationInFrames,
    [footageData.durationInFrames]
  );

  return (
    <div className="relative">
      <Player
        ref={playerRef as any}
        component={Ugc}
        durationInFrames={totalVideoDuration}
        compositionWidth={1080}
        compositionHeight={1920}
        loop
        style={{
          position: "absolute",
          width: "1080px",
          height: "1920px",
          display: "flex",
          transform: "scale(0.276808)",
          marginLeft: isMobile ? "-550px" : "-500px",
          marginTop: "-700px",
          overflow: "hidden",
          borderRadius: "50px",
        }}
        fps={FPS}
        inputProps={{
          hook: {
            ...hookData,
          },
          footage: {
            footageUrl: footageData.file
              ? URL.createObjectURL(footageData.file as File)
              : "",
            ...footageData,
          },
          captions: {
            ...captionsData,
          },
        }}
      />
    </div>
  );
}
