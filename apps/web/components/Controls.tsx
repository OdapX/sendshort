"use client";
import React, { useState, useCallback } from "react";
import { Play, Pause, Expand } from "lucide-react";
import { Button } from "@sendshorts/ui/button";
import { useStateStore } from "../store/state";

const Controls: React.FC = () => {
  const playerRef = useStateStore((state) => state.ui.data.playerRef);
  const [isPlaying, setIsPlaying] = useState(false);

  const fullScreen = useCallback(() => {
    playerRef.current?.requestFullscreen();
  }, [playerRef]);

  return (
    <div className="flex items-center justify-center gap-4 px-2 py-2  rounded-full max-w-[150px] cursor-pointer rounded-full bg-gray-100 shadow-sm">
      {/* Play/Pause Button */}
      <Button
        size="icon"
        className="rounded-full"
        // keep it inline, internal remotion bug.
        onClick={(e) => {
          playerRef.current?.toggle(e);
          setIsPlaying(() => !isPlaying);
        }}
      >
        {isPlaying ? (
          <Pause className="w-4 h-4 text-white ml-0.5" />
        ) : (
          <Play className="w-4 h-4 text-white ml-0.5" />
        )}
      </Button>

      <Button
        variant="outline"
        className="rounded-full"
        size={"icon"}
        onClick={fullScreen}
      >
        <Expand size="14" />
      </Button>
    </div>
  );
};

export default Controls;
