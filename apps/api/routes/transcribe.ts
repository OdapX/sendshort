import { Request, Response } from "express";
import { generateCaptions } from "../lib/generate-captions";

export default async function transcribeRoute(req: Request, res: Response) {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { segments, words } = await generateCaptions(file);

    res.json({ segments, words });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
}
