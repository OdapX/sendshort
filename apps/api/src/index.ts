import { serve } from "@hono/node-server";
import { Hono } from "hono";
import transcribe from "./routes/transcribe.js";

const app = new Hono();

app.get("/", (c) => c.text("ready..."));

app.route("/transcribe", transcribe);

serve({ fetch: app.fetch, port: 8080 }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
