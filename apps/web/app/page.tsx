import { ActiveTabContent } from "../components/ActiveTabContent";
import MobileExpandibleArea from "../components/MobileExpandibleArea";
import Navigator from "../components/Navigator";
import Playground from "../components/Playground";

export default function Home() {
  return (
    <div className="w-full h-screen flex">
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

      <Playground />
    </div>
  );
}
