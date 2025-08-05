"use server";
import { openai } from "@sendshorts/shared/openai";
import { uploadFileToMux } from "./mux-upload";

export async function generateCaptions(file: File) {
  const { playbackId } = await uploadFileToMux(file);

  const transcription = await openai.audio.transcriptions.create({
    file: file,
    model: "whisper-1",
    language: "en",
    response_format: "verbose_json",
    timestamp_granularities: ["word", "segment"],
  });

  if (!transcription?.segments || !transcription.words) {
    throw new Error("No Audio Was Found");
  }

  return {
    segments: transcription.segments.map((s) => ({
      start: s.start,
      end: s.end,
      text: s.text,
    })),
    words: transcription.words.map((s) => ({
      start: s.start,
      end: s.end,
      text: s.word,
    })),
  };
}
