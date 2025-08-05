import z from "zod";

const segmentSchema = z.object({
  start: z.number(),
  end: z.number(),
  text: z.string(),
});

const wordSchema = z.object({
  start: z.number(),
  end: z.number(),
  text: z.string(),
});

export const transcriptionSchema = z.object({
  segments: z.array(segmentSchema),
  words: z.array(wordSchema),
});

export type Transcription = z.infer<typeof transcriptionSchema>;
