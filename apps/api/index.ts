import express, { Request, Response } from "express";
import multer from "multer";
import transcribeRoute from "./routes/transcribe";

const app = express();
const port = 8080;

const upload = multer({ storage: multer.memoryStorage() });

app.get("/", (req: Request, res: Response) => {
  res.send("ready...");
});

app.post("/transcribe", upload.single("file"), transcribeRoute);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
