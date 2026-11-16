import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { TEAM_NOTEBOOKS } from "./notebook/teams";
import TeamSection from "./scrapbook/TeamSection";
import YearbookIndex from "./scrapbook/YearbookIndex";
import { CurvedArrow, Sparkle, Squiggle, Star } from "./scrapbook/Doodles";
import { handwriting } from "./scrapbook/fonts";
import styles from "./scrapbook/Scrapbook.module.css";

/**
 * Meet the Team: a scrapbook-style "yearbook" with one flippable notebook per
 * team (configured in ./notebook/teams.ts). The paper backdrop and all
 * decoration styles are scoped to this component tree.
 */
const MeetTheTeam: React.FC = () => {
  return (
    // overflow-x: clip keeps bleeding shapes and page turns from widening the page
    <div className={cn(styles.paper, "[overflow-x:clip]")}>
      <div className={styles.tornEdge} aria-hidden />

      {/* ---------- Intro ---------- */}
      <div className="relative mx-auto w-11/12 max-w-[1800px] px-8 pb-4 pt-14 md:px-4 md:pt-20">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className={cn(
              styles.blob,
              styles.blobRose,
              "-right-[45%] top-[2%] h-[16rem] w-[22rem] md:-right-[14%] md:h-[24rem] md:w-[34rem]",
            )}
          />
          <Star className="absolute left-[4%] top-[12%] h-8 w-8 rotate-[-12deg] text-primary/55" />
          <Sparkle className="absolute right-[8%] top-[34%] h-6 w-6 text-primary/45" />
          <Star className="absolute bottom-[10%] left-[10%] hidden h-5 w-5 rotate-12 text-[#a54948]/50 md:block" />
        </div>

        <Reveal className="relative space-y-4 text-center">
          <p
            className={cn(
              handwriting.className,
              "flex items-center justify-center gap-2 text-2xl text-primary/80 md:text-3xl",
            )}
          >
            <Sparkle className="h-4 w-4 text-primary/60" />
             2026–2027
            <Sparkle className="h-4 w-4 text-primary/60" />
          </p>
          <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-primary text-balance">
            Meet the Executive Team
          </h1>
          <Squiggle className="mx-auto h-3 w-40 text-primary/55 md:w-56" />

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground text-balance">
            These are the people that make up the UTESCA team.
            <br /> Want to join us? Come to one of our events.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-12 grid max-w-5xl items-center gap-12 md:mt-16 md:grid-cols-2 md:gap-8">
          <div className="relative flex justify-center">
            <div
              aria-hidden
              className={cn(
                styles.blob,
                styles.blobInk,
                "left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2",
              )}
            />
            <Image
              src="/utesca-mascot-team.png"
              alt="UTESCA mascot in front of the CN Tower"
              width={629}
              height={950}
              className="relative h-auto w-auto max-h-[28rem] object-contain"
              priority
            />
          </div>

          <div className="relative">
            <YearbookIndex teams={TEAM_NOTEBOOKS} />
            <p
              className={cn(
                handwriting.className,
                styles.note,
                "mx-auto mt-5 flex max-w-sm items-start justify-end gap-1 text-2xl -rotate-2",
              )}
            >
              <span>flip through each notebook below</span>
              <CurvedArrow className="mt-2 h-10 w-14 shrink-0 text-primary/70" />
            </p>
          </div>
        </div>
      </div>

      {/* ---------- Team sections ---------- */}
      {TEAM_NOTEBOOKS.map((team, i) => (
        <Fragment key={team.id}>
          {i > 0 && (
            <div
              aria-hidden
              className="relative z-[1] mx-auto flex max-w-md items-center gap-4 px-10"
            >
              <div className={cn(styles.stitch, "flex-1")} />
              <Star className="h-5 w-5 text-primary/50" />
              <div className={cn(styles.stitch, "flex-1")} />
            </div>
          )}
          <TeamSection
            team={team}
            index={i}
            total={TEAM_NOTEBOOKS.length}
            preloadCover={i === 0}
          />
        </Fragment>
      ))}

      {/* ---------- Sign-off ---------- */}
      <div className="relative mx-auto flex w-11/12 max-w-[1800px] flex-col items-center px-8 pb-24 pt-4 text-center md:px-4">
        <p className={cn(handwriting.className, styles.note, "text-3xl -rotate-1 md:text-4xl")}>
          that&rsquo;s the whole team ✶ see you at our next event!
        </p>
        <Link
          href="/events"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          See upcoming events <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
};

export default MeetTheTeam;
