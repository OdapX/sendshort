import { Composition, getInputProps } from "remotion";
import Ugc, { UgcProps, ugcSchema } from "./components/Ugc";
import { FPS, UGC_HOOK_DURATION_IN_FRAMES } from "./utils/config";

const DEFAULT_EMPTY_FOOTAGE_DURATION = 5 * FPS;
export const RemotionRoot: React.FC = () => {
  const inputProps = getInputProps<UgcProps>();

  return (
    <Composition
      id="UgcVideo"
      component={Ugc}
      durationInFrames={
        (inputProps.footage?.durationInFrames ||
          DEFAULT_EMPTY_FOOTAGE_DURATION) + UGC_HOOK_DURATION_IN_FRAMES
      }
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
          template: "segment_word_background",
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
