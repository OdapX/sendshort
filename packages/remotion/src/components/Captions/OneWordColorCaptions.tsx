import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { Transcription } from "./schemas";

export default function OneWordColorCaptions({
  transcription,
  fontFamily,
  verticalPosition,
  horizontalPosition,
  fontSize,
  color,
}: {
  transcription: Transcription;
  fontFamily: string;
  verticalPosition: number;
  horizontalPosition: number;
  fontSize: number;
  color: string;
}) {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      {transcription.words.map((word, i) => {
        const sequenceStart = Math.floor(word.start * fps);
        const durationInFrames = Math.max(
          Math.floor((word.end - word.start) * fps),
          1,
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
                top: verticalPosition,
                left: horizontalPosition,
                width: "100%",
                textAlign: "center",
                color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  position: "relative",
                  padding: "4px 8px",
                  borderRadius: 6,
                  color: "#00FF00",
                  fontWeight: 700,
                }}
              >
                {word.text}
              </span>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
}
