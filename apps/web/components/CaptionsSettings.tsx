"use client";
import { Button } from "@sendshorts/ui/button";
import { Separator } from "@sendshorts/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@sendshorts/ui/toggle-group";
import { useCallback, useState } from "react";
import { useStateStore } from "../store/state";
import { TextStyleEditor } from "./TextStyleEditor";
import { generateCaptions } from "../actions/generate-captions";
import { toast } from "@sendshorts/ui/sonner";
import { FileWarning, WandSparkles } from "lucide-react";

const templates = [
  { id: "segment_word_background", name: "Background Color" },
  { id: "segment_one_word_color", name: "Color Highlight" },
  { id: "one_word_color", name: "Word By Word" },
] as const;

export default function CaptionSettings() {
  const captionData = useStateStore((state) => state.captions.data);
  const footageFile = useStateStore((state) => state.footage.data.file);
  const file = useStateStore((state) => state.footage.data.file);
  const [loading, setLoading] = useState(false);
  const updateCaptionField = useStateStore(
    (state) => state.captions.updateField
  );
  console.log("captioins...", captionData.transcription);
  const [selectedTab, setSelectedTab] = useState("templates");
  const handleTabChange = useCallback((v: string) => {
    setSelectedTab(v);
  }, []);

  const getCaptions = useCallback(async () => {
    try {
      setLoading(true);
      const transcription = await generateCaptions(file!);
      updateCaptionField("transcription", transcription);
    } catch {
      toast.error("Could not generate captions");
    } finally {
      setLoading(false);
    }
  }, [file, updateCaptionField]);

  return (
    <div className="relative h-full">
      <span className="text-lg mb-4">Captions</span>
      <Separator />

      {!!captionData.transcription && (
        <>
          <ToggleGroup
            type="single"
            value={selectedTab}
            onValueChange={handleTabChange}
            className="flex  justify-start mt-2"
          >
            <ToggleGroupItem
              value="templates"
              variant="outline"
              className="w-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              templates
            </ToggleGroupItem>
            <ToggleGroupItem
              value={"style"}
              variant="outline"
              className="w-full data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              styles
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="mt-6">
            <Separator />
            {selectedTab === "templates" && (
              <div className="grid grid-cols-1 gap-2 text-sm mt-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant={
                      template.id == captionData.template
                        ? "default"
                        : "outline"
                    }
                    onClick={() => updateCaptionField("template", template.id)}
                  >
                    {template.name}
                  </Button>
                ))}
              </div>
            )}

            {selectedTab === "style" && (
              <div className="mt-2 px-2">
                <TextStyleEditor
                  updateField={updateCaptionField}
                  properties={captionData}
                />
              </div>
            )}
          </div>
        </>
      )}

      {!footageFile && (
        <div className="flex space-x-4 my-8 text-red-500">
          <div>Upload a footage first </div> <FileWarning />
        </div>
      )}
      {!captionData.transcription && (
        <Button
          className="w-full mt-6"
          onClick={getCaptions}
          loading={loading}
          disabled={!footageFile}
        >
          <div className="flex items-center space-x-2">
            <div>Generate Captions</div>
            <WandSparkles />
          </div>
        </Button>
      )}
    </div>
  );
}
