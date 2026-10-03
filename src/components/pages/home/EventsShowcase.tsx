"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import UpcomingEventFeature from "./UpcomingEventFeature";
import PastEventsShowcase from "./PastEventsShowcase";

/**
 * Composes the pink "Upcoming Event" panel and the black "Past Events"
 * panel with a diagonal, scroll-linked wipe between them: as the user
 * scrolls through this section, a black shape with a diagonal leading edge
 * grows up from the bottom of the pink panel, "merging" it into the black
 * one below.
 *
 * The overlay is rendered *inside* UpcomingEventFeature (via its `overlay`
 * prop), not as a sibling spanning both panels — that section already has
 * `overflow-hidden`, so the overlay is physically confined to 0–100% of
 * its own height and can never bleed down and cover PastEventsShowcase,
 * however far the scroll-driven animation advances.
 */
export default function EventsShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 0 at the very top of this section, 1 once its bottom has scrolled to
  // the top of the viewport.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  // Wipe is active for most of the scroll through this section, so it's
  // clearly visible rather than a brief flicker near the seam.
  const wipeProgress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  // top: 100% (v=0, no height visible) -> top: 0% (v=1, covers the whole
  // pink panel). bottom stays pinned at 0 so it only ever grows upward
  // from the seam, never downward into the black panel.
  const overlayTop = useTransform(wipeProgress, (v) => `${100 - v * 100}%`);

  const overlay = (
    <motion.div
      style={{ top: overlayTop }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-black [clip-path:polygon(0_0,100%_45%,100%_100%,0_100%)]"
      aria-hidden
    />
  );

  return (
    <div ref={wrapperRef} className="relative">
      <UpcomingEventFeature overlay={overlay} />
      <PastEventsShowcase />
    </div>
  );
}
