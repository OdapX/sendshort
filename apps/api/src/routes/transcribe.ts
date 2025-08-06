import { Hono } from "hono";
import { generateCaptions } from "../lib/generate-captions";
const transcribe = new Hono();

transcribe.post("/", async (c) => {
  console.log("transcribe request received..");
  const formData = await c.req.formData();
  const file = formData.get("file") as File;

  await generateCaptions(file);

  return c.json({ status: "transcribed" });
});

export default transcribe;
