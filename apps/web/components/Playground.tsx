"use client";
import { Separator } from "@sendshorts/ui/separator";
import Render from "./Render";
import { MIN_COLLAPSED_HEIGHT } from "./MobileExpandibleArea";
import Previewer from "./Previewer";
import Controls from "./Controls";

export default function Playground() {
  return (
    <div className={`w-full h-full px-9 py-2 bg-gray-100/50`}>
      <Render />
      <Separator />
      <div
        className={`relative flex justify-center p-5 w-full`}
        style={{ height: `calc(100% - ${MIN_COLLAPSED_HEIGHT}px)` }}
      >
        <Previewer />
        <div
          className={`absolute w-full h-4`}
          style={{
            bottom: `${MIN_COLLAPSED_HEIGHT - 50}px`,
          }}
        >
          <Controls />
        </div>
      </div>
    </div>
  );
}
