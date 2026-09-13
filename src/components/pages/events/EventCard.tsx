"use client";

import * as React from "react";
import { Calendar, Clock, MapPin, Triangle, Users } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { EventCardProps, ImagePosition } from "@/types/event";
import { EventRegistrationForm } from "@/components/pages/events/EventRegistrationForm";

type EventCardWithRegistrationProps = EventCardProps & {
  id: string;
  dateTime?: string | null;
  location?: string | null;
  maxCapacity?: number | null;
  isExpanded?: boolean;
  autoOpenRegistration?: boolean;
};

export default function EventCard({
  id,
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
  location,
  maxCapacity,
  isExpanded = false,
  autoOpenRegistration = false,
}: EventCardWithRegistrationProps) {
    const [isOpen, setIsOpen] = React.useState(isExpanded);
    const [showRegistration, setShowRegistration] = React.useState(
        autoOpenRegistration
    );

    React.useEffect(() => {
        setShowRegistration(autoOpenRegistration);
        if (autoOpenRegistration) {
            setIsOpen(true);
        }
    }, [autoOpenRegistration]);

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

    if (Number.isNaN(date.getTime())) {
      return null;
    }

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

    if (Number.isNaN(date.getTime())) {
      return null;
    }

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

    if (Number.isNaN(date.getTime())) {
      return null;
    }

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

  // Ignore placeholder images from sample/test data.
  const hasValidImage = Boolean(image) && !image?.includes("example.com");

  const registrationDeadlineDate = registrationDeadline
    ? new Date(registrationDeadline)
    : null;

  const isRegistrationOpen =
    !registrationDeadlineDate ||
    registrationDeadlineDate.getTime() > Date.now();

  const hasInternalRegistration = Boolean(slug && isRegistrationOpen);

  const hasExternalRegistration =
    !hasInternalRegistration && Boolean(registrationLink) && isRegistrationOpen;

  const eventDateDisplay = formatEventDate(dateTime);
  const eventTimeDisplay = formatEventTime(dateTime);
  const deadlineDisplay = formatDeadline(registrationDeadline);

  const eventImage = hasValidImage ? (
    <Image
      src={image!}
      alt={title}
      fill
      className={getImageClassName(imagePosition)}
      style={getImageStyle(imagePosition)}
      draggable={false}
    />
  ) : (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <div className="text-3xl font-bold font-heading">{month}</div>

        <div className="text-4xl font-heading">{day}</div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full">
      <div
        className={`flex items-start gap-8 transition-transform duration-300 ease-in-out ${
          showRegistration ? "-translate-x-[216px]" : ""
        }`}
      >
        {/* EVENT CARD */}
        <div className="w-full flex-none">
          <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-full rounded-lg bg-transparent relative"
          >
            <div className="p-0 space-y-4">
              <div className="flex flex-col items-start gap-4">
                {/* EVENT IMAGE */}
                {albumLink ? (
                  <a
                    href={albumLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    //onClick={(e) => e.preventDefault()}
                    className="block relative w-full h-56 rounded-lg bg-secondary cursor-pointer overflow-hidden"
                  >
                    {eventImage}
                  </a>
                ) : (
                  <div className="relative w-full h-56 rounded-lg bg-secondary overflow-hidden">
                    {eventImage}
                  </div>
                )}

                {/* EVENT HEADER */}
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
                    <h3 className="text-2xl font-normal">{title}</h3>
                    {category && (
                      <span className="text-muted-foreground italic">
                        {category}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* EXPANDED EVENT DETAILS */}
              <CollapsibleContent className="transition-all duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                <div className="space-y-5 text-left">
                  {/* DESCRIPTION */}
                  {description && (
                    <p className="text-lg text-muted-foreground whitespace-pre-line">
                      {description}
                    </p>
                  )}

                  {/* EVENT INFORMATION */}
                  <div className="space-y-2 text-md text-muted-foreground">
                    {/* DATE */}
                    {eventDateDisplay && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 shrink-0" />

                        <span>{eventDateDisplay}</span>
                      </div>
                    )}

                    {/* TIME */}
                    {eventTimeDisplay && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 shrink-0" />

                        <span>{eventTimeDisplay}</span>
                      </div>
                    )}

                    {/* LOCATION */}
                    {location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0" />

                        <span>{location}</span>
                      </div>
                    )}

                    {/* CAPACITY */}
                    {maxCapacity != null && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 shrink-0" />

                        <span>Capacity: {maxCapacity}</span>
                      </div>
                    )}
                  </div>

                  {/* REGISTRATION DEADLINE */}
                  {status === "upcoming" && deadlineDisplay && (
                    <div className="text-md">
                      <span className="font-medium text-foreground">
                        Registration deadline:{" "}
                      </span>

                      <span className="text-muted-foreground">
                        {deadlineDisplay}
                      </span>
                    </div>
                  )}

                  {/* REGISTRATION */}
                  {/* {status === "upcoming" && (
                    <div>
                      {hasInternalRegistration ? (
                        <Button
                          type="button"
                          onClick={() =>
                            setShowRegistration((current) => !current)
                          }
                        >
                          {showRegistration ? "CLOSE REGISTRATION" : "REGISTER"}
                        </Button>
                      ) : hasExternalRegistration ? (
                        <Button asChild>
                          <a
                            href={registrationLink!}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            REGISTER
                          </a>
                        </Button>
                      ) : (
                        <p className="text-lg font-bold text-muted-foreground">
                          Registration is closed.
                        </p>
                      )}
                    </div>
                  )} */}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>

        {/* REGISTRATION FORM */}
        {/* {showRegistration && hasInternalRegistration && slug && id && (
          <div className="w-[600px] min-w-[600px] flex-none">
            <EventRegistrationForm
              event={{
                id,
                slug,
                title,
                dateTime: dateTime ?? null,
                location: location ?? null,
                registrationDeadline: registrationDeadline ?? null,
              }}
              onClose={() => setShowRegistration(false)}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}
