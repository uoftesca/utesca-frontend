import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PublicEventDetail } from "@/types/registration";

function formatEventDate(value?: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(parsed);
}

function formatEventTime(value?: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(parsed);
}

export function formatRegistrationDeadline(value?: string | null) {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(parsed);
}

function EventDetails({ event, deadlineLabel }: Readonly<{ event: PublicEventDetail; deadlineLabel?: string }>) {
  const date = formatEventDate(event.dateTime);
  const time = formatEventTime(event.dateTime);
  const deadline = formatRegistrationDeadline(event.registrationDeadline);
  return (
    <div className="space-y-2 text-base text-foreground">
      {date && <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /><span>{date}</span></div>}
      {time && <div className="flex items-center gap-2"><Clock className="h-4 w-4" /><span>{time}</span></div>}
      {event.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>{event.location}</span></div>}
      {deadline && deadlineLabel && <div className="text-muted-foreground">{deadlineLabel} {deadline}</div>}
    </div>
  );
}

export function InitialRegistrationHeader({ event, closed = false }: Readonly<{ event: PublicEventDetail; closed?: boolean }>) {
  const headline = event.registrationFormSchema?.autoAccept
    ? `Register for ${event.title}`
    : `Application for ${event.title}`;
  return (
    <>
      <Button variant="ghost" size="lg" asChild className="-ml-4 w-fit">
        <Link href="/events" className="inline-flex items-center gap-2"><ArrowLeft className="h-4 w-4" />Back to Events</Link>
      </Button>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-primary md:text-4xl">{headline}</h1>
        <EventDetails event={event} deadlineLabel={closed ? "Registration closed on" : "Registration closes on"} />
      </div>
    </>
  );
}

export function EditRegistrationHeader({ event, registrationId }: Readonly<{ event: PublicEventDetail; registrationId: string }>) {
  return (
    <>
      <Button variant="ghost" size="lg" asChild className="-ml-4 w-fit">
        <Link href={`/registrations/${registrationId}/manage`} className="inline-flex items-center gap-2"><ArrowLeft className="h-4 w-4" />Back to Manage Application</Link>
      </Button>
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold text-primary md:text-4xl">Edit application for {event.title}</h1>
        <EventDetails event={event} />
      </div>
    </>
  );
}
