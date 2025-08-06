import { serve } from "@hono/node-server";
import { Hono } from "hono";
import Redis from "ioredis";
import "dotenv/config";
import process from "process";

const { S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY } = process.env;

const redis = new Redis(
  process.env.REDIS_URL,
  process.env.NODE_ENV == "production"
    ? {
        family: 6,
      }
    : {},
);

const app = new Hono();

app.get("/", async (c) => {
  return c.json({ test: "ok" });
});

app.post("/enqueue", async (c) => {
  const job = await c.req.json();
  console.log("Received job", job);
  await redis.lpush("render-jobs", JSON.stringify(job));
  return c.json({ status: "queued" });
});

serve({
  fetch: app.fetch,
  port: 3001,
});
