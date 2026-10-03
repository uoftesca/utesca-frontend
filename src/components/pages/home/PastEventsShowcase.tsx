"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import Reveal from "@/components/Reveal";
import { fetchEvents, formatEventDate } from "@/utils/events";
import type { Event } from "@/types/event";

const VISIBLE_COUNT = 3;

/**
 * Home-page-only black-background showcase of past events. Sits directly
 * beneath UpcomingEventFeature — the diagonal wipe in EventsShowcase merges
 * the two together as the user scrolls. Shows the first 3 events with an
 * arrow through to the full events page for more.
 *
 * Doesn't require an event to have a photo — most events in the current
 * dataset don't have one yet, so gating on `image` left this section
 * looking empty. Events without a photo fall back to a month/day tile
 * (same convention EventCard.tsx uses).
 *
 * Uses a plain <img>, not next/image, for event photos — see the note in
 * UpcomingEventFeature.tsx for why.
 */
export default function PastEventsShowcase() {
  const [events, setEvents] = useState<Event[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: as this section scrolls through the viewport, shift the
  // photo upward within its frame so more of its top portion comes into
  // view the further down you scroll, instead of it sitting static.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["10%", "-15%"]);

  useEffect(() => {
    let cancelled = false;

    fetchEvents()
      .then((data) => {
        if (cancelled) return;
        const past = data
          .filter((e) => e.status === "past")
          .sort((a, b) => b.date.getTime() - a.date.getTime())
          .slice(0, VISIBLE_COUNT);
        setEvents(past);
      })
      .catch(() => {
        if (!cancelled) setEvents([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90vh] w-full flex-col justify-start overflow-hidden bg-black px-6 pb-20 pt-12 md:px-12 lg:px-20"
    >
      {/* Full-bleed background photo — inset-0 so it reaches the very top
          of the section too (visible as soon as you scroll up into this
          section from the diagonal wipe above). A controlled gradient
          scrim sits on top for text legibility, rather than relying on
          the source image's own fade, which didn't line up cleanly with
          where the header/content actually sit. The photo itself parallax-
          shifts upward on scroll, so more of it shows near the top of the
          section the further down you scroll. */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y: imageY }}
          className="absolute -top-[15%] -bottom-[15%] left-0 -right-[15%]"
        >
          <Image
            src="/students-sitting.png"
            alt="Students sitting in an auditorium"
            fill
            priority
            className="object-cover object-right brightness-110"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/10" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black to-transparent" />
      </div>

      <Reveal className="relative z-10 w-full max-w-6xl space-y-12">
        <h2 className="text-left text-6xl font-black leading-[0.9] tracking-tight text-white md:text-9xl">
          Our Past
          <br />
          Events
        </h2>

        {events.length > 0 ? (
          <div className="flex flex-wrap items-center gap-6 md:gap-4">
            {events.map((event) => {
              const { month, day } = formatEventDate(event.date);

              return (
                <div
                  key={event.id}
                  className="w-56 shrink-0 overflow-hidden rounded-2xl bg-black text-white shadow-2xl ring-2 ring-primary transition-transform duration-300 hover:z-10 hover:scale-105 md:w-64"
                >
                  <div className="p-3 text-center">
                    <p className="truncate text-sm font-semibold">
                      {event.title}
                    </p>
                  </div>
                  <div className="relative h-24 w-full md:h-30">
                    {event.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={event.image}
                        alt={event.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center text-primary">
                        <span className="text-2xl font-bold font-heading">
                          {month}
                        </span>
                        <span className="text-4xl font-heading">{day}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            <Link
              href="/events"
              aria-label="See more past events"
              className="flex h-28 w-24 shrink-0 items-center justify-center rounded-2xl border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white md:h-32"
            >
              <ArrowRight className="h-8 w-8" />
            </Link>
          </div>
        ) : (
          <p className="text-white/50">
            Past event photos will show up here soon.
          </p>
        )}
      </Reveal>
    </section>
  );
}
