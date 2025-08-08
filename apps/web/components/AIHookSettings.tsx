"use client";
import { Input } from "@sendshorts/ui/input";
import { Label } from "@sendshorts/ui/label";
import { Separator } from "@sendshorts/ui/separator";
import { useStateStore } from "../store/state";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { TextStyleEditor } from "./TextStyleEditor";

// mux playack ids for ai avatars.
const playbackIds = [
  "3BoXA600ofDSgg75EY5kJX02r9LBh66nGPmiY8FgHvOGQ",
  "Uo88HNauPdzSITQx5rhLG00QCkIbv1G5G2wbn49hZw88",
  "ohYiA01LSQIQZRBbeFBC1ubw902016800GJGdYfVsVnxERY",
  "8gT3K9fq3Ei8E5Oas5tnUUdmfL4iZnezKuacivOuuTY",
  "5N4Ih5w5wc0100szG4TRVjkEURXmAI84QsqiYx5Cvinbw",
  "lAQEZRxyaZqoSD2SeADW006Um2ugOgQAHJCXTtDhtjIQ",
  "b02JGVXx2o601UqIldkUOBqJ5QIpL0101orYgd01XE8SW02Qc",
  "r9gZ1up01OXTw3pZcAo1W02kSfQSX19ViYIuqaENL5mqY",
  "oNhQGzBqsk4otT4l0102qQLg1vmbaTSgWm38Fe6001Xwdc",
  "B5qRDqnA5MpFCnvYvXKgT01sbewfSPrALNkjoGFAKV00s",
];

export default function AIHookSettings() {
  const hookData = useStateStore((state) => state.hook.data);
  const updateHookField = useStateStore((state) => state.hook.updateField);
  const playerRef = useStateStore((state) => state.ui.data.playerRef);

  const handleAvatarChange = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const callbackId = event.currentTarget.dataset.id;

      updateHookField(
        "ugc_url",
        `https://stream.mux.com/${callbackId}/highest.mp4`
      );
    },
    [updateHookField]
  );

  const handleHooTekTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateHookField("text", e.target.value);
    },
    [updateHookField]
  );

  useEffect(() => {
    playerRef.current.seekTo(0);
  }, [hookData, playerRef]);

  return (
    <div className="space-y-4">
      <span className="text-lg  mb-4">AI Hook Settings</span>
      <Separator />

      <div>
        <Label className="mt-4">Hook</Label>
        <Input
          placeholder="Hook Text.."
          value={hookData.text}
          onChange={handleHooTekTextChange}
        />
        <div className="mt-2">
          <TextStyleEditor
            updateField={updateHookField}
            properties={hookData}
          />
        </div>
      </div>

      <div>
        <Label className="mt-4">AI Avatar</Label>
        <div className="grid grid-cols-6 gap-2">
          {playbackIds.map((id) => (
            <div
              data-id={id}
              key={id}
              className={`rounded-lg overflow-hidden cursor-pointer  ${hookData.ugc_url == `https://stream.mux.com/${id}/highest.mp4` && "ring-2 ring-primary"}`}
              onClick={handleAvatarChange}
            >
              <Image
                src={`https://image.mux.com/${id}/thumbnail.png?time=3&fit_mode=preserve`}
                alt="Thumbnail"
                width={96}
                height={96}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
