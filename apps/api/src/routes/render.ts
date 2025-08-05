import { Hono } from "hono";
import { renderVideo } from "@sendshorts/remotion/render-video";
const render = new Hono();

render.post("/", async (c) => {
  // rendering logic
  await renderVideo({
    inputProps: {
      videoId: "111",
      hook: {
        text: "🔥 Hook this viewer in 3 seconds!",
        ugc_url:
          "https://stream.mux.com/Adqk01F007QKRt019IiNrD01MHbAEjbYJupcjE1IPORIuwQ/highest.mp4",
        vertical_position: 600,
        horizontal_position: 1920 / 2,
        fontFamily: "Poppins",
        size: 35,
        color: "#000000",
      },
      footage: {
        transition: "none",
        transitionDuration: 5,
        durationInFrames: 60,
      },
      captions: {
        template: "default",
        fontFamily: "Arial",
        size: 32,
        color: "white",
        vertical_position: 100,
        horizontal_position: 50,
        transcription: undefined,
      },
    },
  });
  return c.json({ status: "rendered" });
});

export default render;
