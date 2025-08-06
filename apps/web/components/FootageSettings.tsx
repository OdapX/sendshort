"use client";
import { useDropzone } from "react-dropzone";
import { Input } from "@sendshorts/ui/input";
import { Separator } from "@sendshorts/ui/separator";
import { CheckCircle, RotateCcw, Upload } from "lucide-react";
import { useCallback } from "react";
import { toast } from "@sendshorts/ui/sonner";
import { Button } from "@sendshorts/ui/button";
import { useStateStore } from "../store/state";
import { getVideoDuration } from "@sendshorts/shared/get-video-duration";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sendshorts/ui/select";
import { Label } from "@sendshorts/ui/label";
import { availableTransitions } from "@sendshorts/remotion/available-transitons";
import { FPS } from "@sendshorts/remotion/config";
import { Slider } from "@sendshorts/ui/slider";

// 100MB
const MAX_FILE_SIZE = 100 * 1024 * 1024;

const MIN_TRANSITION_DURATION_IN_FRAMES = 2;
const MAX_TRANSITION_DURATION_IN_FRAMES = 30;

export default function FootageSettings() {
  const footageData = useStateStore((state) => state.footage.data);
  const updateFootageField = useStateStore(
    (state) => state.footage.updateField
  );
  const updateCaptionsField = useStateStore(
    (state) => state.captions.updateField
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (!acceptedFiles[0]) {
        toast.error("File too large");
      } else {
        const duration = await getVideoDuration(acceptedFiles[0]!);
        updateFootageField("durationInFrames", Math.ceil(duration * FPS));
        updateFootageField("file", acceptedFiles[0]);
      }
    },
    [updateFootageField]
  );

  const resetFootage = useCallback(() => {
    updateFootageField("file", undefined);
    updateCaptionsField("transcription", undefined);
  }, [updateFootageField, updateCaptionsField]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected: ([reject]) => {
      if (reject?.errors.find(({ code }) => code === "file-too-large")) {
        toast.error("File size to large.", {
          position: "bottom-right",
        });
      }

      if (reject?.errors.find(({ code }) => code === "file-invalid-type")) {
        toast.error("File type not supported.");
      }
    },
    multiple: false,
    maxSize: MAX_FILE_SIZE,
    accept: {
      video: [".mp4", ".webm"],
    },
  });

  return (
    <div className="space-y-4 px-2">
      <span className="text-lg  mb-4">Footage</span>
      <Separator />
      <div>
        {!!footageData.file && (
          <div className="flex justify-between border p-4 rounded-lg">
            <div className="flex space-x-2 justify-center items-center text-primary">
              <CheckCircle size={15} fontSize={15} />
              <p>Footage Added</p>
            </div>
            <Button variant={"outline"} size={"sm"} onClick={resetFootage}>
              <RotateCcw />
            </Button>
          </div>
        )}

        {!footageData.file && (
          <div
            {...getRootProps()}
            className="border-[1px] p-4 rounded-lg hover:bg-gray-100 cursor-pointer text-xs"
          >
            <Input {...getInputProps()} />

            <div className="flex flex-col items-center justify-center space-y-3 ">
              <Upload size="20" />
              <p>Select or Drag-Drop Footage</p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <Label>Intro Transition</Label>
          <div className=" grid grid-cols-2 gap-x-2 items-center px-2">
            <div>
              <Label className="text-xs">Type</Label>
              <Select
                value={footageData.transition}
                onValueChange={(val) =>
                  updateFootageField(
                    "transition",
                    val as typeof footageData.transition
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  {availableTransitions.map((transition) => (
                    <SelectItem key={transition} value={transition}>
                      {transition}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="px-4">
              <Label className="text-xs">Duration In Frames</Label>
              <Slider
                className="mt-4"
                min={MIN_TRANSITION_DURATION_IN_FRAMES}
                max={MAX_TRANSITION_DURATION_IN_FRAMES}
                step={1}
                value={[footageData.transitionDuration]}
                onValueChange={(val) =>
                  updateFootageField("transitionDuration", val[0]!)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
