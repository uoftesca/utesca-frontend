import { Caveat } from "next/font/google";

/**
 * Handwritten face for scrapbook annotations on the Meet the Team page only.
 * Loaded through next/font (self-hosted at build time), like the site fonts.
 */
export const handwriting = Caveat({
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});
