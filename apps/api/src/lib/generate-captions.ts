import { openai } from "@sendshorts/shared/openai";
import fs from "fs";
import { extractAudioFromFile } from "./extract-audio";
import path from "path";

// TODO: Seperation of concerns is needed: decouple caption from upload later.
export async function generateCaptions(file: File) {
  const audioPath = await extractAudioFromFile(file);
  console.log("audio path outside", audioPath);

  if (!fs.existsSync(audioPath)) {
    console.error("File does not exist:", audioPath);
  }
  const fullPath = path.resolve(audioPath);
  console.log("fullpath =========>", fullPath);
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(fullPath),
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
