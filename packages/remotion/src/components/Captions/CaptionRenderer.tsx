import React from "react";
import z from "zod";
import { transcriptionSchema } from "./schemas";
import SegmentWordBackgroundCaptions from "./SegmentWordBackground";
import SegmentOneWordColorCaptions from "./SegmentOneWordColorCaptions";
import OneWordColorCaptions from "./OneWordColorCaptions";

type CaptionProps = {
  template:
    | "segment_word_background"
    | "word_background"
    | "one_word_color"
    | "segment_one_word_color";
  verticalPosition: number;
  horizontalPosition: number;
  fontSize: number;
  color: string;
  fontFamily: string;
  transcription: z.infer<typeof transcriptionSchema>;
};

const CaptionRenderer: React.FC<CaptionProps> = (props) => {
  switch (props.template) {
    case "segment_word_background":
      return <SegmentWordBackgroundCaptions {...props} />;
    case "segment_one_word_color":
      return <SegmentOneWordColorCaptions {...props} />;
    case "one_word_color":
      return <OneWordColorCaptions {...props} />;

    default:
      return null;
  }
};

export default CaptionRenderer;
