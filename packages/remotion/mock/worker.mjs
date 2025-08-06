import Redis from "ioredis";
import { renderVideo } from "./render-video.mjs";
import "dotenv/config";
import pRetry from "p-retry";

const redis = new Redis(
  process.env.REDIS_URL,
  process.env.NODE_ENV == "production"
    ? {
        family: 6,
      }
    : {},
);

console.log("🎬 Worker running.....", process.env.REDIS_URL);

let failed = false;
let videoUrl = null;
let job = null;
let computeTime = 0;

while (true) {
  try {
    const result = await redis.brpop("render-jobs", 0);
    const startTime = performance.now();
    job = JSON.parse(result[1]);

    try {
      videoUrl = await pRetry(
        async () => {
          console.log("🚨🚨🚨🚨🚨🚨🚨🚨🚨render starting:🚨🚨 with");
          return await renderVideo({
            videoId: job.videoId,
            inputProps: job.inputProps,
          });
        },
        {
          retries: 3,
          minTimeout: 6000, // 6 sec
          maxTimeout: 6000,
          onFailedAttempt: (error) => {
            console.error("failure details:", error);
          },
        },
      );
    } catch (error) {
      failed = true;
      console.log("🚨All retries failed for renderVideo.", error);
    }

    const endTime = performance.now();

    computeTime = (endTime - startTime) / 1000;
  } catch (err) {
    failed = true;
    console.error("❌ Worker error:", err);
  } finally {
    const response = await fetch(`${process.env.APP_URL}/api/render-webhook`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        videoUrl,
        videoId: job?.videoId,
        status: failed ? "errored" : "ready",
        computeTime,
      }),
    });

    failed = false;

    if (!response.ok) {
      throw new Error(`Failed to send webhook: ${response.statusText}`);
    }
  }
}
