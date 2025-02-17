import {
  createSystem,
  defineConfig,
  defaultConfig,
  mergeConfigs,
} from "@chakra-ui/react";

const myconfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          DEFAULT: { value: "#d3d239" }, // Color primario base
          50: { value: "#fafae0" },
          100: { value: "#f2f2b2" },
          200: { value: "#eaea80" },
          300: { value: "#e1e14d" },
          400: { value: "#dada26" },
          500: { value: "#d3d239" }, // Igual al DEFAULT
          600: { value: "#c1c100" },
          700: { value: "#a7a700" },
          800: { value: "#8f8f00" },
          900: { value: "#646400" },
        },
        secondary: {
          DEFAULT: { value: "#f59f19" }, // Color secundario base
          50: { value: "#fff5e0" },
          100: { value: "#ffe0b2" },
          200: { value: "#ffcc80" },
          300: { value: "#ffb74d" },
          400: { value: "#ffa726" },
          500: { value: "#f59f19" }, // Igual al DEFAULT
          600: { value: "#fb8c00" },
          700: { value: "#f57c00" },
          800: { value: "#ef6c00" },
          900: { value: "#e65100" },
        },
        accent: {
          DEFAULT: { value: "#04041a" }, // Color de acento base
          50: { value: "#e0e0f7" },
          100: { value: "#b2b2eb" },
          200: { value: "#8080de" },
          300: { value: "#4d4dd0" },
          400: { value: "#2626c6" },
          500: { value: "#04041a" }, // Igual al DEFAULT
          600: { value: "#0000b2" },
          700: { value: "#00009a" },
          800: { value: "#000080" },
          900: { value: "#000064" },
        },
        neutral: {
          DEFAULT: { value: "#fefedc" }, // Color neutral base
          50: { value: "#fffffe" },
          100: { value: "#fefefb" },
          200: { value: "#fdfde0" },
          300: { value: "#fcfcc4" },
          400: { value: "#fbfba9" },
          500: { value: "#fefedc" }, // Igual al DEFAULT
          600: { value: "#e0e0c4" },
          700: { value: "#c4c4a9" },
          800: { value: "#a9a98f" },
          900: { value: "#8f8f75" },
        },
      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
      },
    },
  },
});

const config = mergeConfigs(defaultConfig, myconfig);
export const system = createSystem(config);
