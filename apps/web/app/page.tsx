"use client";
import { ActiveTabContent } from "../components/ActiveTabContent";
import MobileExpandibleArea, {
  MIN_COLLAPSED_HEIGHT,
} from "../components/MobileExpandibleArea";
import Navigator from "../components/Navigator";
import Previewer from "../components/Previewer";
import { Separator } from "@sendshorts/ui/separator";
import Render from "../components/Render";
import { useRef } from "react";
import { PlayerRef } from "@sendshorts/remotion/player";
import Controls from "../components/Controls";

export default function Home() {
  const playerRef = useRef<PlayerRef>(null);

  return (
    <div className="h-screen flex">
      <div className="hidden w-24 py-4 lg:flex flex-col items-center border-r  min-h-full">
        <Navigator />
      </div>
      <MobileExpandibleArea>
        <Navigator />
        <ActiveTabContent />
      </MobileExpandibleArea>
      <div className="hidden lg:block w-[600px] min-h-full max-h-full overflow-y-auto p-4">
        <ActiveTabContent />
      </div>

      <div className={`w-full px-9 py-2 bg-gray-100/50`}>
        <Render />
        <Separator />
        <div
          className={`relative flex justify-center p-5 w-full`}
          style={{ height: `calc(100% - ${MIN_COLLAPSED_HEIGHT}px)` }}
        >
          <Previewer playerRef={playerRef} />
          <div
            className={`absolute w-full h-4`}
            style={{
              bottom: `${MIN_COLLAPSED_HEIGHT - 50}px`,
            }}
          >
            <Controls playerRef={playerRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
