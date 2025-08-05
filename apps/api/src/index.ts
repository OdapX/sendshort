import { serve } from "@hono/node-server";
import { Hono } from "hono";
import transcribe from "./routes/transcribe.js";
import render from "./routes/render.js";

const app = new Hono();

app.get("/", (c) => c.text("Api Ready."));

app.route("/transcribe", transcribe);
app.route("/render", render);

serve({ fetch: app.fetch, port: 8080 }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});
