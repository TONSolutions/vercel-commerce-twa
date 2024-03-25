import { Roboto } from "next/font/google";
import localFont from "next/font/local";

export const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap"
});

export const sfPro = localFont({
  src: [
    {
      path: "SFProDisplay-Regular.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "SFProDisplay-RegularItalic.woff2",
      weight: "400",
      style: "italic"
    },
    {
      path: "SFProDisplay-Semibold.woff2",
      weight: "600",
      style: "normal"
    },
    {
      path: "SFProDisplay-SemiboldItalic.woff2",
      weight: "600",
      style: "italic"
    }
  ]
});
