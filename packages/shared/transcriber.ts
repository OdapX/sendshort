import fs from "fs";
import { openai } from "./openai";

async function transcribeAudio(audioUrl: string) {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioUrl),
    model: "whisper-1",
    language: "en",
    response_format: "verbose_json",
    timestamp_granularities: ["segment", "word"],
  });
}
