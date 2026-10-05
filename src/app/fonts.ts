import { Almarai, Tajawal } from "next/font/google";
import localFont from "next/font/local";

// Latin faces shipped with the Mahu design system. They stand in for the brand's Luam,
// which was never supplied.
export const bigShoulders = localFont({
  src: "../assets/fonts/big-shoulders-display-latin.woff2",
  weight: "300 700",
  variable: "--font-big-shoulders",
});

export const archivoNarrow = localFont({
  src: "../assets/fonts/archivo-narrow-latin.woff2",
  weight: "400 700",
  variable: "--font-archivo-narrow",
});

// Arabic faces. Display type only ever uses the bold weight.
export const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: "700",
  variable: "--font-tajawal",
});

export const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-almarai",
});

/** Class names that define every font's CSS variable; set them on <html>, where the tokens live. */
export const fontVariables = [
  bigShoulders.variable,
  archivoNarrow.variable,
  tajawal.variable,
  almarai.variable,
].join(" ");
