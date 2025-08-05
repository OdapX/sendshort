"use client";
import { Button } from "@sendshorts/ui/button";
import { Separator } from "@sendshorts/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@sendshorts/ui/toggle-group";
import { useCallback, useState } from "react";
import { useStateStore } from "../store/state";
import { TextStyleEditor } from "./TextStyleEditor";
import { generateCaptions } from "../actions/generate-captions";
import { toast } from "@sendshorts/ui/sonner";

const templates = [
  { id: "word_background", name: "Word Background" },
  { id: "one_word_color", name: "One Word Color" },
  { id: "flux", name: "Flux" },
] as const;

export default function CaptionSettings() {
  const captionData = useStateStore((state) => state.captions.data);
  const file = useStateStore((state) => state.footage.data.file);
  const [loading, setLoading] = useState(false);
  const updateCaptionField = useStateStore(
    (state) => state.captions.updateField
  );
  const [selectedTab, setSelectedTab] = useState("templates");
  const [selectedTemplate, setSelectedTemplate] = useState("word_background");
  const handleTabChange = useCallback((v: string) => {
    setSelectedTab(v);
  }, []);

  const getCaptions = useCallback(async () => {
    try {
      setLoading(true);
      const transcription = await generateCaptions(file!);
      console.log("transicriont /n", transcription);
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
        {selectedTab === "templates" && (
          <div className="grid grid-cols-3 gap-2 text-sm">
            {templates.map((template) => (
              <Button
                key={template.id}
                variant={
                  template.id == selectedTemplate ? "default" : "outline"
                }
                onClick={() => setSelectedTemplate(template.id)}
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
      <Button
        variant="destructive"
        className="w-full mt-9"
        onClick={getCaptions}
        loading={loading}
      >
        Generate Captions
      </Button>
    </div>
  );
}
