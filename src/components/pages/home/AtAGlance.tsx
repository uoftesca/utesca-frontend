"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import Reveal from "@/components/Reveal";

const DESCRIPTION =
  "UTESCA is the premier engineering consulting club at UofT. We bridge engineering and consulting for students who are interested in pursuing a career in consulting.";

const FAST_FACTS = [
  { num: "80", label: "Student Executives" },
  { num: "30", label: "Projects Since 2020" },
  { num: "15", label: "Disciplines Engaged" },
];

/**
 * Home-page-only "UTESCA at a Glance" section. Dark red section (bg-
 * primary), white text.
 *
 * "UTESCA At A Glance" sits up top, "Meet Our Mascot" sits at the bottom
 * — both always in the DOM. A single wide diagonal rectangle (no stats on
 * it for now, just a solid lighter-red band, same shape as the earlier
 * "spans the whole section" divider) starts positioned over the bottom
 * (covering the mascot, so only the glance content reads as visible), and
 * as the user scrolls through this pinned section (sticky, with extra
 * scroll room via the h-[200vh] wrapper below) it slides upward to cover
 * the glance content instead — unveiling the mascot underneath as it
 * departs.
 *
 * Can't preview this, so the band's start/end vertical position is a
 * first pass — nudge the top-percentage keyframes if it doesn't fully
 * clear the mascot at rest, or fully cover the glance text by the end.
 */
export default function AtAGlance() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  // 0: band sits low, over the mascot. 1: band has slid up, over the
  // glance text instead.
  const bandTop = useTransform(scrollYProgress, [0, 1], ["78%", "18%"]);

  // Glance fades out and mascot fades in on non-overlapping ranges, so
  // only one of the two is ever visible at a time — neither relies purely
  // on the band's rotated shape lining up pixel-perfect with their actual
  // (rectangular) bounds.
  const glanceOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const mascotOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <div ref={wrapperRef} className="relative h-[200vh]">
      <section className="sticky top-0 flex min-h-screen w-full flex-col justify-between gap-12 overflow-hidden bg-primary px-6 py-16 text-primary-foreground md:px-12 lg:px-20">
        {/* UTESCA At A Glance — top, fades out as the band arrives to
            cover it */}
        <motion.div style={{ opacity: glanceOpacity }} className="relative z-0">
          <Reveal className="max-w-3xl text-left">
            <h2 className="text-7xl font-black leading-[0.9] tracking-tight md:text-9xl">
              UTESCA{" "}
              <span className="align-baseline font-sans text-xl font-normal text-primary-foreground/60 md:text-3xl">
                Since 2020
              </span>
              <br />
              At A Glance
            </h2>
            <p className="mt-8 text-2xl font-bold text-primary-foreground/90 md:text-3xl">
              {DESCRIPTION}
            </p>
            <p className="mt-8 text-xl italic text-primary-foreground/70 md:text-2xl">
              &ldquo;To push the boundaries of engineering through innovation,
              technology, and creative problem-solving.&rdquo;
            </p>
          </Reveal>
        </motion.div>

        {/* Meet Our Mascot — bottom, hidden until the band has cleared it.
            Mascot image on the left, heading + traits on the right. */}
        <motion.div
          style={{ opacity: mascotOpacity }}
          className="relative z-0 mb-4 ml-auto flex items-center gap-8 md:mb-8 md:gap-12"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-80 w-80 shrink-0 md:h-[28rem] md:w-[28rem]"
          >
            <Image
              src="/utesca-mascot-cntower.png"
              alt="UTESCA mascot in front of the CN tower"
              fill
              className="object-contain"
              style={{
                filter:
                  "drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff)",
              }}
            />
          </motion.div>

          <div className="text-left">
            <h3 className="text-7xl font-black leading-[0.9] tracking-tight md:text-9xl">
              Meet Our
              <br />
              Mascot
            </h3>
            <ul className="mt-8 list-inside list-disc space-y-4 text-2xl text-primary-foreground/90 md:text-3xl">
              <li>Unites & Engage</li>
              <li>Quick Team</li>
              <li>Problem Solver</li>
            </ul>
          </div>
        </motion.div>

        {/* Diagonal band — slides from covering the mascot up to covering
            the glance text as the user scrolls. The stats live inside it
            (not counter-rotated), so they're angled the same as the band
            and move together with it as one unit. */}
        <motion.div
          style={{ top: bandTop }}
          className="absolute left-1/2 z-20 flex h-80 w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-[35deg] items-center justify-center rounded-2xl bg-[#d24e40] shadow-2xl md:h-96"
        >
          <div className="grid grid-cols-3 gap-8 text-center text-white md:gap-16">
            {FAST_FACTS.map((fact) => (
              <div key={fact.label}>
                <p className="text-6xl font-black font-heading md:text-8xl">
                  {fact.num}
                </p>
                <p className="text-base font-black uppercase tracking-wide text-white/90 md:text-lg">
                  {fact.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
