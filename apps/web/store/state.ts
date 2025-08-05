import { create } from "zustand";
import { z } from "zod";
import { availableTransitions } from "@sendshorts/remotion/available-transitons";

const segmentSchema = z.object({
  start: z.number(),
  end: z.number(),
  text: z.string(),
});

const wordSchema = z.object({
  start: z.number(),
  end: z.number(),
  text: z.string(),
});

const transcriptionSchema = z.object({
  segments: z.array(segmentSchema),
  words: z.array(wordSchema),
});

const textStyleSchema = z.object({
  fontFamily: z.string(),
  size: z.number(),
  color: z.string(),
  vertical_position: z.number(),
  horizontal_position: z.number(),
});

const hookSchema = z
  .object({
    text: z.string(),
    ugc_url: z.string().url(),
  })
  .merge(textStyleSchema);

const footageSchema = z.object({
  file: z.instanceof(File).or(z.undefined()),
  transition: z.enum(availableTransitions),
  transitionDuration: z.number(),
  durationInFrames: z.number(),
});

const captionsSchema = z
  .object({
    template: z.string(),
    transcription: transcriptionSchema.or(z.undefined()),
  })
  .merge(textStyleSchema);

const uiSchema = z.object({
  activeTab: z.enum(["hook", "footage", "captions"]),
});

type HookData = z.infer<typeof hookSchema>;
type FootageData = z.infer<typeof footageSchema>;
type CaptionsData = z.infer<typeof captionsSchema>;
type UiData = z.infer<typeof uiSchema>;

type StateStore = {
  ui: {
    data: UiData;
    setActiveTab: (tab: UiData["activeTab"]) => void;
  };
  hook: {
    data: HookData;
    updateField: <K extends keyof HookData>(key: K, value: HookData[K]) => void;
  };
  footage: {
    data: FootageData;
    updateField: <K extends keyof FootageData>(
      key: K,
      value: FootageData[K]
    ) => void;
  };
  captions: {
    data: CaptionsData;
    updateField: <K extends keyof CaptionsData>(
      key: K,
      value: CaptionsData[K]
    ) => void;
  };
};

export const useStateStore = create<StateStore>((set) => ({
  ui: {
    data: {
      activeTab: "hook",
    },
    setActiveTab: (tab) => {
      set((state) => ({
        ui: {
          ...state.ui,
          data: {
            ...state.ui.data,
            activeTab: tab,
          },
        },
      }));
    },
  },
  hook: {
    data: {
      text: "hook this viewer in 5 seconds!",
      ugc_url:
        "https://stream.mux.com/5N4Ih5w5wc0100szG4TRVjkEURXmAI84QsqiYx5Cvinbw/highest.mp4",
      vertical_position: 300,
      horizontal_position: 0,
      fontFamily: "Poppins",
      color: "#000000",
      size: 35,
    },
    updateField: (key, value) => {
      const validator = hookSchema.shape[key];
      const result = validator.safeParse(value);

      if (result.success) {
        set((state) => ({
          hook: {
            ...state.hook,
            data: {
              ...state.hook.data,
              [key]: value,
            },
          },
        }));
      } else {
        throw new Error(`Validation error: hook.${key}`, result.error);
      }
    },
  },

  footage: {
    data: {
      file: undefined,
      transition: "none",
      durationInFrames: 60,
      transitionDuration: 5,
    },
    status: "idle",
    updateField: (key, value) => {
      const validator = footageSchema.shape[key];
      const result = validator.safeParse(value);

      if (result.success) {
        set((state) => ({
          footage: {
            ...state.footage,
            data: {
              ...state.footage.data,
              [key]: value,
            },
          },
        }));
      } else {
        throw new Error(`Validation error: footage.${key}`, result.error);
      }
    },
  },

  captions: {
    data: {
      template: "",
      fontFamily: "Poppins",
      color: "#000000",
      vertical_position: 0,
      horizontal_position: 0,
      size: 35,
    },
    status: "idle",
    updateField: (key, value) => {
      const validator = captionsSchema.shape[key];
      const result = validator.safeParse(value);

      if (result.success) {
        set((state) => ({
          captions: {
            ...state.captions,
            data: {
              ...state.captions.data,
              [key]: value,
            },
          },
        }));
      } else {
        throw new Error(`Validation error: captions.${key}`, result.error);
      }
    },
  },
}));
