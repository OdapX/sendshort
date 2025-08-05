import { AbsoluteFill, OffthreadVideo } from "remotion";
import { TransitionSeries } from "@remotion/transitions";
import { linearTiming } from "@remotion/transitions";
import { z } from "zod";
import { useEffect } from "react";
import { availableTransitions } from "../utils/available-transitons";
import { presentationMapper } from "../utils/presentationMapper";
import {
  UGC_HOOK_DURATION_IN_FRAMES,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../utils/config";
import { loadGoogleFont } from "../utils/load-google-font";
import WordBackgroundCaptions from "./Captions/WordBackground";
import { transcriptionSchema } from "./Captions/schemas";

const textStyleSchema = z.object({
  fontFamily: z.string(),
  size: z.number(),
  color: z.string(),
  vertical_position: z.number(),
  horizontal_position: z.number(),
});

export const ugcSchema = z.object({
  hook: z
    .object({
      text: z.string(),
      ugc_url: z.string().url(),
      vertical_position: z.number(),
      horizontal_position: z.number(),
    })
    .merge(textStyleSchema),
  footage: z.object({
    videoUrl: z.string().url().optional(),
    transition: z.enum(availableTransitions),
    transitionDuration: z.number(),
    durationInFrames: z.number(),
  }),
  captions: z
    .object({
      template: z.string(),
      transcription: transcriptionSchema.or(z.undefined()),
    })
    .merge(textStyleSchema),
});

export type UgcProps = z.infer<typeof ugcSchema>;

export default function Ugc(props: UgcProps) {
  useEffect(() => {
    const fontLoadCalls = [
      props.hook.fontFamily,
      props.captions.fontFamily,
    ].map((font) => loadGoogleFont(font));

    (async () => {
      await Promise.all(fontLoadCalls);
    })();
  }, [props.hook.fontFamily, props.captions.fontFamily]);

  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={UGC_HOOK_DURATION_IN_FRAMES}
        >
          <AbsoluteFill>
            <OffthreadVideo src={props.hook.ugc_url} />
            <div
              style={{
                position: "absolute",
                top: props.hook.vertical_position,
                left: props.hook.horizontal_position,
                fontFamily: props.hook.fontFamily,
                fontSize: props.hook.size,
                color: props.hook.color,
                width: "100%",
                textAlign: "center",
                fontWeight: "bolder",
                textShadow: "10px 10px 10px rgba(0, 0, 0, 0.3)",
              }}
            >
              {props?.hook?.text}
            </div>
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={presentationMapper({
            transitionName: props.footage.transition,
            width: VIDEO_WIDTH,
            height: VIDEO_HEIGHT,
          })}
          timing={linearTiming({
            durationInFrames: props.footage.transitionDuration,
          })}
        />

        <TransitionSeries.Sequence
          durationInFrames={props.footage.durationInFrames}
        >
          {props.footage.videoUrl ? (
            <AbsoluteFill>
              <OffthreadVideo src={props.footage.videoUrl} />
              {props.captions.transcription && (
                <WordBackgroundCaptions
                  transcription={props.captions.transcription}
                  fontFamily={props.captions.fontFamily}
                  verticalPostion={props.captions.vertical_position}
                  horizontalPosition={props.captions.horizontal_position}
                  fontSize={props.captions.size}
                  color={props.captions.color}
                />
              )}
            </AbsoluteFill>
          ) : (
            <AbsoluteFill
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: 48,
                fontWeight: "bold",
                backgroundColor: "#202123",
                color: "white",
              }}
            >
              Your Footage Will Go Here.
            </AbsoluteFill>
          )}
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
}
