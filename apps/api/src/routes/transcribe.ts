import { Hono } from "hono";
const transcribe = new Hono();

transcribe.post("/", async (c) => {
  // transcription logic
  return c.json({ status: "transcribed" });
});

export default transcribe;
