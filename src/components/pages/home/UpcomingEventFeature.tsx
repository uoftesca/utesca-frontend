"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import Reveal from "@/components/Reveal";
import { fetchEvents, formatEventDate } from "@/utils/events";
import type { Event } from "@/types/event";

const TIME_ZONE = "America/Toronto";

const dateFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  weekday: "long",
  month: "long",
  day: "numeric",
});
const timeFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
  timeZoneName: "short",
});
const timeNoZoneFormat = new Intl.DateTimeFormat("en-CA", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
});
const dayKeyFormat = new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE });

function parse(dateTime?: string | null) {
  if (!dateTime) return null;
  const parsed = new Date(dateTime);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

// End is ignored if missing, invalid, or not after the start.
function parseRange(start?: string, end?: string | null) {
  const from = parse(start);
  const to = parse(end);
  return { from, to: from && to && to > from ? to : null };
}

// "Friday, November 20", or "Friday, November 20–Sunday, November 22".
function formatDateRange(start?: string, end?: string | null) {
  const { from, to } = parseRange(start, end);
  if (!from) return null;
  return to ? dateFormat.formatRange(from, to) : dateFormat.format(from);
}

// "6:00 p.m. EST", "6:00–8:00 p.m. EST", or for multi-day events
// "6:00 p.m. – 2:00 p.m. EST" (the dates are on the line above).
function formatTimeRange(start?: string, end?: string | null) {
  const { from, to } = parseRange(start, end);
  if (!from) return null;
  if (!to) return timeFormat.format(from);
  if (dayKeyFormat.format(from) === dayKeyFormat.format(to)) {
    return timeFormat.formatRange(from, to);
  }
  return `${timeNoZoneFormat.format(from)} – ${timeFormat.format(to)}`;
}

// `overlay` is the scroll wipe from EventsShowcase.tsx.
export default function UpcomingEventFeature({
  overlay,
}: {
  overlay?: ReactNode;
}) {
  const [nextEvent, setNextEvent] = useState<Event | null | undefined>(
    undefined,
  );

  useEffect(() => {
    let cancelled = false;

    fetchEvents()
      .then((events) => {
        if (cancelled) return;
        const upcoming = events
          .filter((e) => e.status === "upcoming")
          .sort((a, b) => a.date.getTime() - b.date.getTime());
        setNextEvent(upcoming[0] ?? null);
      })
      .catch(() => {
        if (!cancelled) setNextEvent(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const isLoading = nextEvent === undefined;

  return (
    <section className="sticky top-0 flex min-h-screen w-full flex-col justify-center overflow-hidden bg-secondary px-6 py-20 md:px-12 lg:px-20">
      <div className="mx-auto w-full max-w-6xl space-y-12">
        <h2 className="text-center text-5xl font-black tracking-tight text-primary md:text-8xl">
          Upcoming Event
        </h2>

        {!isLoading && !nextEvent ? (
          <div className="space-y-6 text-center">
            <p className="text-lg text-secondary-foreground/70">
              There are no upcoming events right now — check back soon!
            </p>
            <Button asChild size="lg">
              <Link href="/events">View All Events</Link>
            </Button>
          </div>
        ) : (
          <Reveal>
            <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
              <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-primary/80 text-primary-foreground shadow-xl md:h-[420px]">
                {nextEvent?.image ? (
                  <Image
                    src={nextEvent.image}
                    alt={nextEvent.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  nextEvent && (
                    <div className="flex h-full w-full flex-col items-center justify-center">
                      <span className="text-4xl font-bold font-heading">
                        {formatEventDate(nextEvent.date).month}
                      </span>
                      <span className="text-6xl font-heading">
                        {formatEventDate(nextEvent.date).day}
                      </span>
                    </div>
                  )
                )}
              </div>

              <div className="space-y-6 text-left">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
                  Next Up
                </p>

                <h3 className="text-3xl font-bold leading-tight text-primary md:text-4xl">
                  {isLoading ? "Loading…" : nextEvent?.title}
                </h3>

                {nextEvent && (
                  <div className="space-y-2 text-base text-secondary-foreground/80">
                    {formatDateRange(nextEvent.dateTime, nextEvent.endDateTime) && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 shrink-0 text-primary" />
                        <span>
                          {formatDateRange(nextEvent.dateTime, nextEvent.endDateTime)}
                        </span>
                      </div>
                    )}
                    {formatTimeRange(nextEvent.dateTime, nextEvent.endDateTime) && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 shrink-0 text-primary" />
                        <span>
                          {formatTimeRange(nextEvent.dateTime, nextEvent.endDateTime)}
                        </span>
                      </div>
                    )}
                    {nextEvent.location && (

                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 shrink-0 text-primary" />
                        <span>{nextEvent.location}</span>
                      </div>
                    )}
                  </div>
                )}

                {nextEvent?.description && (
                  <p className="line-clamp-3 text-base text-secondary-foreground/70 md:text-lg">
                    {nextEvent.description}
                  </p>
                )}

                {nextEvent && (
                  <div className="pt-2">
                    <Button
                      asChild
                      size="xl"
                      className="h-12 px-12 text-base font-bold"
                    >
                      <Link href={`/events?register=${nextEvent.slug}`}>
                        RSVP Now
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        )}
      </div>

      {overlay}
    </section>
  );
}
