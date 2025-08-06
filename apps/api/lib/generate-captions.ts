import { openai } from "@sendshorts/shared/openai";
import fs from "fs";
import { extractAudioFromFile } from "./extract-audio";
import path from "path";

export async function generateCaptions(file: Express.Multer.File) {
  const audioPath = await extractAudioFromFile(file);

  if (!fs.existsSync(audioPath)) {
    console.error("File does not exist:", audioPath);
  }
  const fullPath = path.resolve(audioPath);
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
