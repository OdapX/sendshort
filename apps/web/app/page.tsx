"use client";
import { ActiveTabContent } from "../components/ActiveTabContent";
import MobileExpandibleArea, {
  MIN_COLLAPSED_HEIGHT,
} from "../components/MobileExpandibleArea";
import Navigator from "../components/Navigator";
import Previewer from "../components/Previewer";

export default function Home() {
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
      <div
        className={`flex justify-center p-5 w-full h-[calc(100%-${MIN_COLLAPSED_HEIGHT}px)] lg:h-full  bg-gray-100/50`}
      >
        <Previewer />
      </div>
    </div>
  );
}
