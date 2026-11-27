// Docs: theming -> "The map", the `theme` fragment, typed with GenerativeUITheme to check it.
// Not used: its URLs are placeholders (tiles.example.com), so maps would fail to load.
import type { GenerativeUITheme } from "@copilotkit/react-core/v2/generative-ui";

export const mapTheme: GenerativeUITheme = {
  mapStyle: "https://tiles.example.com/light.json",
  dark: { mapStyle: "https://tiles.example.com/dark.json" },
};
