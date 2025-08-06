"use client";
import { useEffect } from "react";
import { useStateStore } from "../store/state";
import { toast } from "@sendshorts/ui/sonner";

// TODO: this should be through swr or react-query.

// sync zustand store with rendering progress
export function useRenderProgress({ videoId }: { videoId: string | null }) {
  const updateField = useStateStore((state) => state.ui.updateField);

  useEffect(() => {
    if (!videoId) return;

    let isMounted = true;

    const fetchProgress = async () => {
      try {
        console.log("fetching progresss ......");
        const res = await fetch("/api/retrieve-video", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId }),
        });
        if (!res.ok) throw new Error("Failed to fetch progress");

        const data = await res.json();
        if (isMounted) {
          updateField("renderProgress", data.video?.progress);
          updateField("renderStatus", data.video?.status);
          updateField("videoUrl", data.video?.videoUrl);
        }
      } catch (err) {
        if (isMounted) {
          toast.error((err as Error)?.message || "Unknown error");
        }
      }
    };

    fetchProgress();

    const intervalId = setInterval(fetchProgress, 5000);
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [updateField, videoId]);
}
