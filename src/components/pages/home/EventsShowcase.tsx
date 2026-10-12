"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import UpcomingEventFeature from "./UpcomingEventFeature";
import PastEventsShowcase from "./PastEventsShowcase";

// UpcomingEventFeature is sticky, same mechanic as Scroll.tsx/JoinUTESCA:
// it's the next sibling after HomeHero's own sticky wrapper, so once Hero's
// hold ends, Upcoming immediately starts sticking too and (being opaque,
// later in paint order) overtakes/covers Hero. Wrapped in its own div below
// so its sticky range is bounded to just its own height, not leaking into
// PastEventsShowcase -- same fix pattern as HomeHero's sticky-leak bug.
export default function EventsShowcase() {
  const upcomingRef = useRef<HTMLDivElement>(null);

  // Self-referential to Upcoming's own sticky hold duration (progress 0 at
  // the moment it starts sticking, 1 right as it's about to unstick), so
  // the wipe stays in sync regardless of Upcoming's actual height instead
  // of assuming a fixed ratio against the combined Upcoming+Past scroll
  // distance (which broke once Upcoming became sticky).
  const { scrollYProgress } = useScroll({
    target: upcomingRef,
    offset: ["start start", "end start"],
  });

  const wipeProgress = useTransform(scrollYProgress, [0.3, 0.95], [0, 1]);
  const overlayTop = useTransform(wipeProgress, (v) => `${100 - v * 100}%`);

  const overlay = (
    <motion.div
      style={{ top: overlayTop }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] bg-black [clip-path:polygon(0_0,100%_45%,100%_100%,0_100%)]"
      aria-hidden
    />
  );

  return (
    <div className="relative">
      <div ref={upcomingRef} className="relative">
        <UpcomingEventFeature overlay={overlay} />
      </div>
      {/* -mt-px: min-h-screen can round to a fractional device pixel,
          leaving a hairline gap at this seam that shows the page
          background through. 1px overlap removes it. */}
      <div className="-mt-px">
        <PastEventsShowcase />
      </div>
    </div>
  );
}
