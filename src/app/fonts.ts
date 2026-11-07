import { Figtree, Tajawal } from "next/font/google";
import localFont from "next/font/local";

// The rebrand sets its copy in Effra, which isn't available for the web here; these stand in for it.

// Latin headlines: tall and condensed like the logo's MāHū letters. Shipped with the Mahu design system.
export const bigShoulders = localFont({
  src: "../assets/fonts/big-shoulders-display-latin.woff2",
  weight: "300 700",
  variable: "--font-big-shoulders",
});

// Latin text: stand-in for Effra.
export const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-figtree",
});

// Arabic headlines and text: the closest free match to Effra Arabic.
export const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
});

/** Class names that define every font's CSS variable; set them on <html>, where the tokens live. */
export const fontVariables = [bigShoulders.variable, figtree.variable, tajawal.variable].join(" ");
