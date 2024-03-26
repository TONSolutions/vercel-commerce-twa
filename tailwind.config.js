// eslint-disable-next-line no-restricted-imports
import { HEX_CODE_HASH } from "./components/product/constants";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const konstaConfig = require("konsta/config");

/** @type {import('tailwindcss').Config} */

module.exports = konstaConfig({
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    ...Object.values(HEX_CODE_HASH).map((color) => `bg-[${color}]`),
    ...Object.values(HEX_CODE_HASH).map((color) => `outline-[${color}]`)
  ],
  theme: {
    extend: {
      colors: {
        bg_color: "#ffffff",

        header_bg_color: "#ffffff",
        secondary_bg_color: "#f4f4f5",

        section_bg_color: "#ffffff",
        section_header_text_color: "#3390ec",

        accent_text_color: "#3390ec",
        destructive_text_color: "#df3f40",
        subtitle_text_color: "#707579",
        text_color: "#000000",
        hint_color: "#707579",

        button_color: "#3390ec",
        button_text_color: "#ffffff",
        link_color: "#00488f"
      }
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [require("@tailwindcss/container-queries"), require("@tailwindcss/typography")]
});
