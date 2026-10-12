"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import UpcomingEventFeature from "./UpcomingEventFeature";
import PastEventsShowcase from "./PastEventsShowcase";

// Overlay lives inside UpcomingEventFeature so it can't bleed into PastEventsShowcase.
export default function EventsShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end start"],
  });

  const wipeProgress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);
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
      {/* -mt-px: min-h-screen can round to a fractional device pixel,
          leaving a hairline gap at this seam that shows the page
          background through. 1px overlap removes it. */}
      <div className="-mt-px">
        <PastEventsShowcase />
      </div>
    </div>
  );
}
