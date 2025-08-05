import { Composition } from "remotion";
import Ugc, { ugcSchema } from "./components/Ugc";
import { FPS } from "./utils/config";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="UgcVideo"
      component={Ugc}
      durationInFrames={FPS * 10} // 10 seconds at 30fps
      schema={ugcSchema}
      fps={FPS}
      width={1080}
      height={1920}
      defaultProps={{
        hook: {
          text: "🔥 Hook this viewer in 3 seconds!",
          ugc_url:
            "https://stream.mux.com/Adqk01F007QKRt019IiNrD01MHbAEjbYJupcjE1IPORIuwQ/highest.mp4",
          vertical_position: 600,
          horizontal_position: 1920 / 2,
          fontFamily: "Poppins",
          size: 35,
          color: "#000000",
        },
        footage: {
          transition: "none",
          transitionDuration: 5,
          durationInFrames: 60,
        },
        captions: {
          template: "default",
          fontFamily: "Arial",
          size: 32,
          color: "white",
          vertical_position: 100,
          horizontal_position: 50,
          transcription: undefined,
        },
      }}
    />
  );
};
