import { CAPTION_TEMPLATES } from "@sendshorts/remotion/available-caption-templates";
import { availableTransitions } from "@sendshorts/remotion/available-transitons";
import z from "zod";

export const segmentSchema = z.object({
  start: z.number(),
  end: z.number(),
  text: z.string(),
});

export const wordSchema = z.object({
  start: z.number(),
  end: z.number(),
  text: z.string(),
});

export const transcriptionSchema = z.object({
  segments: z.array(segmentSchema),
  words: z.array(wordSchema),
});

export const textStyleSchema = z.object({
  fontFamily: z.string(),
  size: z.number(),
  color: z.string(),
  vertical_position: z.number(),
  horizontal_position: z.number(),
});

export const hookSchema = z
  .object({
    text: z.string(),
    ugc_url: z.string().url(),
  })
  .merge(textStyleSchema);

export const footageSchema = z.object({
  file: z.instanceof(File).or(z.undefined()),
  transition: z.enum(availableTransitions),
  transitionDuration: z.number(),
  durationInFrames: z.number(),
});

export const captionsSchema = z
  .object({
    template: z.enum(CAPTION_TEMPLATES),
    transcription: transcriptionSchema.or(z.undefined()),
  })
  .merge(textStyleSchema);

export const uiSchema = z.object({
  videoId: z.string().or(z.undefined()),
  renderStatus: z.enum(["ready", "errored", "processing", "idle"]),
  renderProgress: z.number(),
  videoUrl: z.string().url().or(z.undefined()),
  activeTab: z.enum(["hook", "footage", "captions"]),
  playerRef: z.object({
    current: z.any(),
  }),
});

export const inputPropsSchema = z.object({
  footage: footageSchema
    .omit({ file: true })
    .extend({ file: z.instanceof(File) }),
  captions: captionsSchema
    .omit({
      transcription: true,
    })
    .extend({ transcription: transcriptionSchema }),
  hook: hookSchema,
});

export type INPUT_PROPS = z.infer<typeof inputPropsSchema>;

export type HookData = z.infer<typeof hookSchema>;
export type FootageData = z.infer<typeof footageSchema>;
export type CaptionsData = z.infer<typeof captionsSchema>;
export type UiData = z.infer<typeof uiSchema>;
