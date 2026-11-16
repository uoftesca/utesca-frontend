import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import styles from "./Scrapbook.module.css";

/* Hand-drawn decorative marks. All are aria-hidden: purely ornamental. */

interface DoodleProps {
  className?: string;
  style?: CSSProperties;
}

/** Slightly wobbly five-point star outline. */
export function Star({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={cn("pointer-events-none", className)}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20.5 3.5 L24.8 15.2 L37 15.9 L27.4 23.4 L30.9 35.6 L20.2 28.6 L9.6 35.9 L12.9 23.6 L3.2 16.2 L15.6 15.1 Z" />
    </svg>
  );
}

/** Small four-point sparkle. */
export function Sparkle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("pointer-events-none", className)}
      style={style}
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 1.5c.6 5 2.4 8.4 10.5 10.5-8.1 2.1-9.9 5.5-10.5 10.5-.6-5-2.4-8.4-10.5-10.5C9.6 9.9 11.4 6.5 12 1.5z" />
    </svg>
  );
}

/**
 * Curved hand-drawn arrow. Drawn pointing down-left; flip with `-scale-x-100`
 * to point down-right.
 */
export function CurvedArrow({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 120 90"
      className={cn("pointer-events-none", className)}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M112 8 C 92 4, 62 10, 50 30 C 40 47, 46 60, 30 72 C 24 77, 17 80, 10 82" />
      <path d="M22 70 L9 82.5 L26 86" />
    </svg>
  );
}

/** Loose scribble underline. */
export function Squiggle({ className, style }: DoodleProps) {
  return (
    <svg
      viewBox="0 0 220 24"
      className={cn("pointer-events-none", className)}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      aria-hidden
      preserveAspectRatio="none"
    >
      <path d="M3 14 C 20 4, 30 22, 48 12 S 78 4, 94 13 S 124 22, 140 11 S 170 3, 186 13 S 210 18, 217 9" />
    </svg>
  );
}

/** Translucent strip of washi tape with torn ends. */
export function Tape({
  className,
  style,
  tone = "neutral",
}: DoodleProps & { tone?: "neutral" | "rose" }) {
  return (
    <span
      aria-hidden
      className={cn(
        styles.tape,
        tone === "rose" && styles.tapeRose,
        "pointer-events-none",
        className,
      )}
      style={style}
    />
  );
}
