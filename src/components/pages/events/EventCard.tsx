import * as React from "react";
import { Calendar, Clock, ExternalLink, MapPin, Triangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";
import { EventCardProps, ImagePosition } from "@/types/event";

export default function EventCard({
  title,
  month,
  day,
  category,
  description,
  image,
  imagePosition = "center",
  slug,
  registrationLink,
  registrationDeadline,
  registrationFormSchema,
  albumLink,
  status,
  dateTime,
  endDateTime,
  location,
  isExpanded = false,
}: EventCardProps & { isExpanded?: boolean }) {
  const [isOpen, setIsOpen] = React.useState(isExpanded);
  const [currentTime] = React.useState(Date.now);

  React.useEffect(() => {
    setIsOpen(isExpanded);
  }, [isExpanded]);

  const getImageStyle = (position: ImagePosition): React.CSSProperties => {
    if (typeof position === "number") {
      return {
        objectPosition: `center ${position}px`,
      };
    }
    return {};
  };

  const getImageClassName = (position: ImagePosition): string => {
    if (typeof position === "number") {
      return "object-cover rounded-lg select-none";
    }
    return `object-cover rounded-lg select-none object-${position}`;
  };

  const formatEventDate = (value?: string | null) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Toronto",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatEventTime = (value?: string | null) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Toronto",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);
  };

  const formatDeadline = (value?: string | null) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/Toronto",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
    }).format(date);
  };

  const eventDateDisplay = formatEventDate(dateTime);
  const eventTimeDisplay = formatEventTime(dateTime);
  const deadlineDisplay = formatDeadline(registrationDeadline);
  const endDateTimeDisplay = formatDeadline(endDateTime);

  const registrationDeadlineDate = registrationDeadline
    ? new Date(registrationDeadline)
    : null;
  const isRegistrationOpen =
    !registrationDeadlineDate ||
    registrationDeadlineDate.getTime() > currentTime;
  const hasInternalRegistration = Boolean(
    slug && registrationFormSchema && isRegistrationOpen,
  );
  const registrationUrl = hasInternalRegistration
    ? `/events/${slug}/register`
    : registrationLink || null;
  const isExternalRegistration = registrationUrl
    ? registrationUrl.startsWith("http")
    : false;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full rounded-lg bg-transparent relative"
    >
      <div className="p-0 space-y-4">
        <div className="flex flex-col items-start gap-4">
          {albumLink ? (
            <a
              href={albumLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block relative w-full h-56 rounded-lg bg-card cursor-pointer overflow-hidden"
            >
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className={getImageClassName(imagePosition)}
                  style={getImageStyle(imagePosition)}
                  draggable={false}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="text-center">
                    <div className="text-4xl font-bold font-heading">
                      {month}
                    </div>
                    <div className="text-4xl font-heading">{day}</div>
                  </div>
                </div>
              )}
            </a>
          ) : (
            <div className="relative w-full h-56 rounded-lg bg-card overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className={getImageClassName(imagePosition)}
                  style={getImageStyle(imagePosition)}
                  draggable={false}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <div className="text-center">
                    <div className="text-4xl font-bold font-heading">
                      {month}
                    </div>
                    <div className="text-4xl font-heading">{day}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-start gap-3 w-full">
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto [&_svg]:size-3 hover:bg-transparent text-inherit hover:text-primary mt-[5px]"
              >
                <Triangle
                  className={`transition-transform duration-200 fill-current ${
                    isOpen ? "rotate-180" : "rotate-90"
                  }`}
                />
              </Button>
            </CollapsibleTrigger>

            <div className="flex flex-col items-start text-left">
              <h3 className="text-2xl font-normal ">{title}</h3>
              {category && (
                <span className="text-muted-foreground italic">{category}</span>
              )}
            </div>
          </div>
        </div>
        <CollapsibleContent className="transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
          <div className="space-y-5 text-left">
            {/* DESCRIPTION */}
            {description && (
              <p className="text-lg text-muted-foreground whitespace-pre-line">
                {description}
              </p>
            )}

            {/* EVENT INFORMATION */}
            <div className="space-y-2 text-base text-muted-foreground">
              {eventDateDisplay && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>{eventDateDisplay}</span>
                </div>
              )}
              {eventTimeDisplay && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{eventTimeDisplay}</span>
                </div>
              )}
              {endDateTimeDisplay && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>Ends: {endDateTimeDisplay}</span>
                </div>
              )}
              {location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{location}</span>
                </div>
              )}
            </div>

            {/* REGISTRATION DEADLINE */}
            {status === "upcoming" && deadlineDisplay && (
              <div className="text-base">
                <span className="font-medium text-foreground">
                  Registration deadline:{" "}
                </span>
                <span className="text-muted-foreground">{deadlineDisplay}</span>
              </div>
            )}

            {/* REGISTRATION */}
            {status === "upcoming" && (
              <div>
                {registrationUrl ? (
                  <Button asChild>
                    {isExternalRegistration ? (
                      <a
                        href={registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5"
                      >
                        REGISTER
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <Link
                        href={registrationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        REGISTER
                      </Link>
                    )}
                  </Button>
                ) : (
                  <p className="text-lg font-bold text-muted-foreground">
                    Registration not available yet
                  </p>
                )}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  );
}
