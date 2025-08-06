"use client";
import React, { useState, useCallback } from "react";
import { Play, Pause, Expand } from "lucide-react";
import { PlayerRef } from "@sendshorts/remotion/player";
import { Button } from "@sendshorts/ui/button";

interface VideoTimelineProps {
  playerRef: React.RefObject<PlayerRef | null>;
}

const Controls: React.FC<VideoTimelineProps> = ({ playerRef }) => {
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
