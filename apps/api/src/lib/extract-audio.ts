import fs from "fs";
import os from "os";
import path from "path";
import { spawn } from "child_process";

export async function extractAudioFromFile(file: File) {
  const videoPath = path.join(os.tmpdir(), `video-${Date.now()}.mp4`);
  const audioPath = path.join(os.tmpdir(), `audio-${Date.now()}.m4a`);
  const buffer = Buffer.from(await file.arrayBuffer());

  await new Promise((resolve, reject) => {
    fs.writeFile(videoPath, buffer, (err) => {
      if (err) reject(err);
      else resolve(null);
    });
  });

  await new Promise((resolve, reject) => {
    const ffmpeg = spawn("ffmpeg", [
      "-i",
      videoPath,
      "-vn",
      "-acodec",
      "copy",
      audioPath,
    ]);

    ffmpeg.on("error", reject);

    ffmpeg.on("close", (code) => {
      if (code === 0) resolve(null);
      else reject(new Error(`ffmpeg exited with code ${code}`));
    });
  });

  await new Promise((resolve) => {
    fs.unlink(videoPath, () => resolve(null));
  });

  console.log("audioPath", audioPath);
  return audioPath;
}
