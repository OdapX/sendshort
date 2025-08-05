import { Button } from "@sendshorts/ui/button";
import { Captions, Lightbulb, Video } from "lucide-react";
import { useStateStore } from "../store/state";
import { useCallback } from "react";

const tabs = [
  { name: "hook", label: "AI Hook", Icon: Lightbulb },
  { name: "footage", label: "Footage", Icon: Video },
  { name: "captions", label: "Captions", Icon: Captions },
];

export default function Navigator() {
  const activeTab = useStateStore((state) => state.ui.data.activeTab);
  const setActiveTab = useStateStore((state) => state.ui.setActiveTab);

  const handleTabChange = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const tabName = event.currentTarget.dataset.name as
        | "hook"
        | "footage"
        | "captions";
      setActiveTab(tabName);
    },
    [setActiveTab]
  );

  return (
    <div className="flex lg:block">
      {tabs.map(({ name, label, Icon }) => (
        <Button
          key={name}
          variant={"ghost"}
          className="w-full h-24 cursor-pointer"
          data-name={name}
          onClick={handleTabChange}
        >
          <div
            className={`flex flex-row lg:flex-col  items-center justify-center gap-2 ${activeTab === name ? "text-primary" : "text-gray-500"}`}
          >
            <Icon />
            <div className="text-xs">{label}</div>
          </div>
        </Button>
      ))}
    </div>
  );
}
