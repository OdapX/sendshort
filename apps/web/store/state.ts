import { create } from "zustand";
import {
  CaptionsData,
  captionsSchema,
  FootageData,
  footageSchema,
  HookData,
  hookSchema,
  UiData,
  uiSchema,
} from "../dtos";

type StateStore = {
  ui: {
    data: UiData;
    updateField: <K extends keyof UiData>(key: K, value: UiData[K]) => void;
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
      renderProgress: 0,
      renderStatus: "idle",
    },
    updateField: (key, value) => {
      const validator = uiSchema.shape[key];
      const result = validator.safeParse(value);

      if (result.success) {
        set((state) => ({
          ui: {
            ...state.ui,
            data: {
              ...state.ui.data,
              [key]: value,
            },
          },
        }));
      }
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
      }
    },
  },

  captions: {
    data: {
      template: "segment_word_background",
      fontFamily: "Poppins",
      color: "#000000",
      vertical_position: 0,
      horizontal_position: 0,
      size: 35,
    },
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
      }
    },
  },
}));
