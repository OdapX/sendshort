import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import os from "os";
import { dirname, resolve } from "node:path";
import { type UgcProps } from "../components/Ugc";

console.log("rendering...");
const __dirname = dirname(__filename);

const OUTPUT_PATH = path.join(os.tmpdir(), "output.mp4");
const entryPoint = resolve(__dirname, "../../src/index.ts");

let bundled: string | null = null;

export const renderVideo = async ({
  inputProps,
}: {
  inputProps: UgcProps & { videoId: string };
}) => {
  if (!bundled) {
    bundled = await bundle({
      entryPoint,
      webpackOverride: (config) => config,
    });

    console.log("bundled...", bundled);
  }

  //   const onProgress = async ({
  //     renderedFrames,
  //     encodedFrames,
  //     encodedDoneIn,
  //     renderedDoneIn,
  //     stitchStage,
  //     progress,
  //   }) => {
  //     const now = Date.now();
  //     if (now - lastLogged >= 5000) {
  //       if (stitchStage === "encoding") {
  //         // First pass, parallel rendering of frames and encoding into video
  //         console.log("STAGE: Encoding...");
  //       } else if (stitchStage === "muxing") {
  //         // Second pass, adding audio to the video
  //         console.log("STAGE:  Muxing audio...");
  //       }
  //       // Amount of frames rendered into images
  //       console.log(`${renderedFrames} rendered`);
  //       // Amount of frame encoded into a video
  //       console.log(`${encodedFrames} encoded`);
  //       // Time to create images of all frames
  //       if (renderedDoneIn !== null) {
  //         console.log(`Rendered in ${renderedDoneIn}ms`);
  //       }
  //       // Time to encode video from images
  //       if (encodedDoneIn !== null) {
  //         console.log(`Encoded in ${encodedDoneIn}ms`);
  //       }
  //       try {
  //         const response = await fetch(`${process.env.APP_URL}/api/progress`, {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({
  //             progress,
  //             videoId: inputProps?.videoId,
  //           }),
  //         });

  //         if (!response.ok) {
  //           throw new Error(`Failed to send progress: ${response.statusText}`);
  //         }
  //         lastLogged = now;
  //       } catch (e) {
  //         console.error("failed to send progress", e);
  //       }
  //     }
  //   };

  const composition = await selectComposition({
    id: "UgcVideo",
    serveUrl: bundled,
    inputProps,
  });

  await renderMedia({
    codec: "h264",
    composition,
    serveUrl: bundled,
    outputLocation: OUTPUT_PATH,
    // onProgress,
    chromiumOptions: {
      enableMultiProcessOnLinux: true,
    },
    inputProps,
  });

  console.log("output file", OUTPUT_PATH);

  return;
};
