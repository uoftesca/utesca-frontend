"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

import Reveal from "@/components/Reveal";
import { fetchEvents, formatEventDate } from "@/utils/events";
import type { Event, ImagePosition } from "@/types/event";

const VISIBLE_COUNT = 3;

// Same framing as EventCard on the events page: a named position, or a pixel
// offset from the top.
function toObjectPosition(position: ImagePosition = "center") {
  return typeof position === "number" ? `center ${position}px` : `center ${position}`;
}

export default function PastEventsShowcase() {
  const [events, setEvents] = useState<Event[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

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
      <div className="absolute inset-0">
        <motion.div
          style={{ y: imageY }}
          className="absolute -top-[15%] -bottom-[15%] left-0 -right-[15%]"
        >
          <Image
            src="/students-sitting2.png"
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
                  className="relative aspect-[25/14] w-72 shrink-0 overflow-hidden rounded-2xl bg-black text-white shadow-2xl ring-2 ring-primary transition-transform duration-300 hover:z-10 hover:scale-105 lg:w-80"
                >
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      sizes="(min-width: 1024px) 20rem, 18rem"
                      className="object-cover"
                      style={{ objectPosition: toObjectPosition(event.imagePosition) }}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center pt-10 text-primary">
                      <span className="text-2xl font-bold font-heading">
                        {month}
                      </span>
                      <span className="text-4xl font-heading">{day}</span>
                    </div>
                  )}

                  <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-black/80 to-transparent p-3 pb-8 text-center">
                    <p className="line-clamp-2 text-xl font-black font-heading leading-tight">
                      {event.title}
                    </p>
                  </div>
                </div>
              );
            })}

            <Link
              href="/events"
              aria-label="See more past events"
              className="flex aspect-square w-20 shrink-0 items-center justify-center rounded-2xl border border-white/20 text-white/70 transition-colors hover:border-white/50 hover:text-white md:w-24"
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
