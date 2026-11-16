"use client";

import { useRef } from "react";
import {
  MotionConfig,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";

import { cn } from "@/lib/utils";
import TeamNotebook from "../notebook/TeamNotebook";
import type { TeamNotebookConfig } from "../notebook/teams";
import { CurvedArrow, Sparkle, Star } from "./Doodles";
import { handwriting } from "./fonts";
import styles from "./Scrapbook.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/* Coordinated reveal: number → heading → note → notebook. */
const group: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Decoration layouts, cycled per section so neighbouring teams differ.
 * Positions sit in the side margins / behind the notebook, never over controls.
 */
const LAYOUTS = [
  {
    numeral: "left-[1%] top-6 md:left-[3%]",
    blobA:
      "-left-[12%] top-[22%] h-[26rem] w-[34rem] md:h-[34rem] md:w-[46rem]",
    blobB:
      "-right-[10%] bottom-[2%] h-[16rem] w-[20rem] md:h-[22rem] md:w-[28rem]",
    blobBTone: styles.blobWarm,
    stars: [
      {
        kind: "star",
        cls: "left-[5%] top-[46%] h-7 w-7 rotate-[-14deg] text-primary/60",
      },
      { kind: "sparkle", cls: "right-[6%] top-[30%] h-5 w-5 text-primary/50" },
      {
        kind: "star",
        cls: "right-[4%] bottom-[14%] h-5 w-5 rotate-12 text-[#a54948]/50",
      },
    ],
  },
  {
    numeral: "right-[1%] top-6 md:right-[3%]",
    blobA:
      "-right-[14%] top-[18%] h-[26rem] w-[34rem] md:h-[34rem] md:w-[46rem]",
    blobB:
      "-left-[8%] bottom-[6%] h-[15rem] w-[19rem] md:h-[20rem] md:w-[26rem]",
    blobBTone: styles.blobRose,
    stars: [
      { kind: "sparkle", cls: "left-[6%] top-[26%] h-6 w-6 text-primary/45" },
      {
        kind: "star",
        cls: "right-[5%] top-[52%] h-6 w-6 rotate-[18deg] text-primary/55",
      },
      {
        kind: "star",
        cls: "left-[4%] bottom-[18%] h-4 w-4 rotate-[-8deg] text-[#a54948]/55",
      },
    ],
  },
] as const;

interface TeamSectionProps {
  team: TeamNotebookConfig;
  index: number;
  total: number;
  preloadCover?: boolean;
}

export default function TeamSection({
  team,
  index,
  total,
  preloadCover = false,
}: TeamSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const layout = LAYOUTS[index % LAYOUTS.length];
  const noteOnRight = index % 2 === 0;

  // Gentle parallax on a few background pieces.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const numeralY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const blobAY = useTransform(scrollYProgress, [0, 1], [70, -70]);
  const blobBY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  // Reduced motion: markup stays identical on server and client (no hydration
  // mismatch); CSS pins the parallax layers and MotionConfig skips transforms.
  const pinned = "motion-reduce:!transform-none";

  const number = pad(index + 1);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={ref}
        id={team.id}
        aria-labelledby={`${team.id}-heading`}
        className="relative scroll-mt-24 py-16 md:py-24"
      >
        {/* ---------- Backdrop (behind content) ---------- */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <motion.div
            style={{ y: blobAY }}
            className={cn(styles.blob, styles.blobInk, layout.blobA, pinned)}
          />
          <motion.div
            style={{ y: blobBY }}
            className={cn(styles.blob, layout.blobBTone, layout.blobB, pinned)}
          />
          <motion.span
            style={{ y: numeralY }}
            className={cn(styles.numeral, layout.numeral, pinned)}
          >
            {number}
          </motion.span>
          {layout.stars.map((s, i) =>
            s.kind === "star" ? (
              <Star key={i} className={cn("absolute hidden md:block", s.cls)} />
            ) : (
              <Sparkle
                key={i}
                className={cn("absolute hidden md:block", s.cls)}
              />
            ),
          )}
        </div>

        {/* ---------- Content ---------- */}
        <motion.div
          className="relative z-[1] mx-auto w-11/12 max-w-[1800px] px-8 md:px-4"
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
        >
          <div className="relative mb-8 md:mb-10">
            <motion.h2
              variants={item}
              id={`${team.id}-heading`}
              className="flex flex-col items-center justify-center gap-x-3 gap-y-2 text-center text-3xl font-bold text-primary text-balance md:flex-row md:text-4xl"
            >
              <span aria-hidden className="flex items-center gap-2">
                <span className={styles.stamp}>{number}</span>
                <span className="hidden font-sans text-2xl font-light text-primary/45 md:inline">
                  /
                </span>
              </span>
              <span>{team.name}</span>
            </motion.h2>
            <motion.p
              variants={item}
              aria-hidden
              className="mt-1 text-center font-sans text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-primary/45"
            >
              Team {number} of {pad(total)}
            </motion.p>

            {team.note && (
              <motion.div
                variants={item}
                className={cn(
                  // Below xl: a small note under the heading.
                  "mt-3 flex justify-center",
                  // xl+: tucked into the side margin, arrow curling toward the book.
                  "xl:absolute xl:top-1 xl:mt-0 xl:block xl:w-56",
                  noteOnRight ? "xl:right-[2%]" : "xl:left-[2%]",
                )}
              >
                <p
                  className={cn(
                    handwriting.className,
                    styles.note,
                    "text-2xl xl:text-[1.75rem]",
                    noteOnRight ? "rotate-[-3deg]" : "rotate-[3deg]",
                    noteOnRight ? "xl:text-left" : "xl:text-right",
                  )}
                >
                  {team.note}
                </p>
                <CurvedArrow
                  className={cn(
                    "hidden h-16 w-24 text-primary/70 xl:block",
                    noteOnRight ? "ml-2" : "ml-auto mr-2 -scale-x-100",
                  )}
                />
              </motion.div>
            )}
          </div>

          <motion.div variants={item}>
            <TeamNotebook
              team={team}
              preloadCover={preloadCover}
              tilt={noteOnRight ? -1.1 : 1.1}
            />
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
