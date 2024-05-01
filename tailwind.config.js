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
      flex: {
        carousel: "0 0 100%"
      },
    }
  },
  future: {
    hoverOnlyWhenSupported: true
  },
  plugins: [require("@tailwindcss/container-queries"), require("@tailwindcss/typography")]
});
