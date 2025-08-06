import { bundle } from "@remotion/bundler";
import cuid from "cuid";
import { renderMedia, selectComposition } from "@remotion/renderer";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./S3.js";
import fs from "fs/promises";
import path from "path";
import os from "os";
import "dotenv/config";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const OUTPUT_PATH = path.join(os.tmpdir(), "output.mp4");
const entryPoint = resolve(__dirname, "../src/index.ts");

const bundled = await bundle({
  entryPoint,
  webpackOverride: (config) => config,
});

let lastLogged = Date.now();

export const renderVideo = async ({ videoId, inputProps }) => {
  const onProgress = async ({
    renderedFrames,
    encodedFrames,
    encodedDoneIn,
    renderedDoneIn,
    stitchStage,
    progress,
  }) => {
    const now = Date.now();
    if (now - lastLogged >= 5000) {
      console.log("progress =========>", progress);

      if (stitchStage === "encoding") {
        // First pass, parallel rendering of frames and encoding into video
        console.log("STAGE: Encoding...");
      } else if (stitchStage === "muxing") {
        // Second pass, adding audio to the video
        console.log("STAGE:  Muxing audio...");
      }
      // Amount of frames rendered into images
      console.log(`${renderedFrames} rendered`);
      // Amount of frame encoded into a video
      console.log(`${encodedFrames} encoded`);
      // Time to create images of all frames
      if (renderedDoneIn !== null) {
        console.log(`Rendered in ${renderedDoneIn}ms`);
      }
      // Time to encode video from images
      if (encodedDoneIn !== null) {
        console.log(`Encoded in ${encodedDoneIn}ms`);
      }
      try {
        console.log(
          "sending progress ...... ========>",
          `${process.env.APP_URL}/api/progress`,
        );
        const response = await fetch(`${process.env.APP_URL}/api/progress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            progress,
            videoId,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to send progress: ${response.statusText}`);
        }
        lastLogged = now;
      } catch (e) {
        console.error("failed to send progress", e);
      }
    }
  };

  const composition = await selectComposition({
    serveUrl: bundled,
    id: "UgcVideo",
    inputProps,
  });

  await renderMedia({
    codec: "h264",
    composition,
    serveUrl: bundled,
    outputLocation: OUTPUT_PATH,
    onProgress,
    chromiumOptions: {
      enableMultiProcessOnLinux: true,
    },
    inputProps,
  });
  const fileBuffer = await fs.readFile(OUTPUT_PATH);

  const Key = `${cuid()}.mp4`;
  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key,
      Body: fileBuffer,
      ContentType: "video/mp4",
    }),
  );

  await fs.unlink(OUTPUT_PATH);

  return `https://pub-c5c4c22786d54da6be2ce0296cdbf97c.r2.dev/${Key}`;
};
