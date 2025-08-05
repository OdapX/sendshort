"use client";

import { useStateStore } from "../store/state";
import AIHookSettings from "./AIHookSettings";
import CaptionSettings from "./CaptionsSettings";
import FootageSettings from "./FootageSettings";

export function ActiveTabContent() {
  const activeTab = useStateStore((state) => state.ui.data.activeTab);

  switch (activeTab) {
    case "hook":
      return <AIHookSettings />;
    case "footage":
      return <FootageSettings />;
    case "captions":
      return <CaptionSettings />;
    default:
      return null;
  }
}
