import { HexColorPicker } from "react-colorful";
import React from "react";
import { Label } from "@sendshorts/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sendshorts/ui/select";
import { Input } from "@sendshorts/ui/input";
import { VIDEO_HEIGHT, VIDEO_WIDTH } from "@sendshorts/remotion/config";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@sendshorts/ui/popover";
import { Slider } from "@sendshorts/ui/slider";

const availableFonts = [
  "AbyssinicaSIL",
  "Poppins",
  "Abril Fatface",
  "DefinitelyNotAFont123",
];

const HORIZONTAL_BUFFER = 50;
const VERTICAL_BUFFER = 100;

type Properties = {
  fontFamily: string;
  size: number;
  color: string;
  vertical_position: number;
  horizontal_position: number;
};

type TextStyleEditorProps = {
  properties: Properties;
  updateField: (key: keyof Properties, value: string | number) => void;
};

export const TextStyleEditor: React.FC<TextStyleEditorProps> = ({
  properties,
  updateField,
}) => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        <div className="flex flex-col col-span-2 space-y-1">
          <Label className="text-xs">Font Family</Label>
          <Select
            value={properties.fontFamily}
            onValueChange={(value) => updateField("fontFamily", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a font" />
            </SelectTrigger>
            <SelectContent>
              {availableFonts.map((fontFamily) => (
                <SelectItem key={fontFamily} value={fontFamily}>
                  {fontFamily}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-1">
          <Label className="text-xs">Size</Label>
          <Input
            type="number"
            value={properties.size}
            onChange={(e) => updateField("size", Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col space-y-1">
          <Label className="text-xs">Color</Label>
          <Popover>
            <PopoverTrigger>
              <div
                className="w-9 h-9 rounded-full border"
                style={{ backgroundColor: properties.color }}
              />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col items-center justify-center z-[999999]">
              {properties.color}
              <HexColorPicker
                color={properties.color}
                onChange={(color) => updateField("color", color)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div className="space-y-2">
          <Label className="text-xs">Vertical Position</Label>
          <Slider
            min={VERTICAL_BUFFER}
            max={VIDEO_HEIGHT - VERTICAL_BUFFER}
            step={5}
            value={[properties.vertical_position]}
            onValueChange={(val) => updateField("vertical_position", val[0]!)}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Horizontal Position</Label>
          <Slider
            min={-VIDEO_WIDTH / 2 + HORIZONTAL_BUFFER}
            max={VIDEO_WIDTH / 2 - HORIZONTAL_BUFFER}
            step={5}
            value={[properties.horizontal_position]}
            onValueChange={(val) => updateField("horizontal_position", val[0]!)}
          />
        </div>
      </div>
    </div>
  );
};
