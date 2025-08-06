"use client";

import { useEffect } from "react";
import { useStateStore } from "../store/state";
import cuid from "cuid";

// Set/Get a videoId to sync external events with the current state.
export function LocalVideoSync() {
  const updateField = useStateStore((state) => state.ui.updateField);

  useEffect(() => {
    const videoId = localStorage.getItem("videoId");
    if (videoId) {
      updateField("videoId", videoId);
    } else {
      localStorage.setItem("videoId", cuid());
    }
  }, [updateField]);

  return null;
}
