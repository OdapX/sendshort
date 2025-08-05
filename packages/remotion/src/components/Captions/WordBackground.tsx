import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Transcription } from "./schemas";
// import { fitText } from "@remotion/layout-utils";

// const MAX_CAPTION_WIDTH_PERCENTAGE = 0.8;

export default function WordBackgroundCaptions({
  transcription,
  fontFamily,
  verticalPostion,
  horizontalPosition,
  fontSize,
  color,
}: {
  transcription: Transcription;
  fontFamily: string;
  verticalPostion: number;
  horizontalPosition: number;
  fontSize: number;
  color: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const timeInSeconds = frame / fps;

  return (
    <AbsoluteFill>
      {transcription.segments.map((segment, i) => {
        const segmentStart = segment.start;
        const segmentEnd = segment.end;
        const sequenceStart = segmentStart * fps;
        const durationInFrames = (segmentEnd - segmentStart) * fps;

        const wordsInSegment = transcription.words.filter(
          (word) => word.start >= segmentStart && word.end <= segmentEnd,
        );

        return (
          <Sequence
            key={i}
            from={sequenceStart}
            durationInFrames={durationInFrames}
          >
            <AbsoluteFill
              style={{
                fontSize,
                fontFamily,
                top: verticalPostion,
                left: horizontalPosition,
                width: "100%",
                textAlign: "center",
                color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                {wordsInSegment.map((word, wi) => {
                  const isActive =
                    timeInSeconds >= word.start && timeInSeconds < word.end;

                  return (
                    <span
                      key={wi}
                      style={{
                        position: "relative",
                        padding: "4px 8px",
                        borderRadius: 6,
                        backgroundColor: isActive ? "#00FF00" : "transparent",
                        color: isActive ? "#000" : color,
                        fontWeight: 700,
                      }}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </div>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
