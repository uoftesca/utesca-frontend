import * as React from "react";

import { Event } from "@/types/event";
import { fetchEvents, formatEventDate } from "@/utils/events";
import UpcomingEventPreview from "./UpcomingEventPreview";

/**
 * ============================================================================
 * EventDetails
 * ============================================================================
 *
 * PURPOSE
 * -------
 * Displays previews for the next 3 upcoming events.
 * Registration logic belongs in EventRegistrationForm.tsx.
 *
 *
 * DATA FLOW
 * ---------
 *
 * fetchEvents()
 *      ↓
 * all events
 *      ↓
 * keep status === "upcoming"
 *      ↓
 * sort chronologically
 *      ↓
 * take first 3
 *      ↓
 * UpcomingEventPreview
 *
 *
 * IMPORTANT BACKEND NOTE
 * ----------------------
 * If event previews stop appearing after backend/API changes, check:
 *
 *   1. fetchEvents() in @/utils/events
 *   2. Event type in @/types/event
 *   3. Whether the API still returns:
 *        - event.id
 *        - event.title
 *        - event.date
 *        - event.status
 *
 * Do NOT try to fix registration/database-field problems in this file.
 * This component only reads event information.
 * ============================================================================
 */

interface EventDetailsProps {
  /**
   * Called when the user selects one of the event previews.
   *
   * The parent component controls what happens after a date is selected.
   * For example, it may display the full EventCard for that date.
   */
  onDateSelect?: (date: Date) => void;

  /** Home-page behaviour: clicking a preview goes to the events page with
   *  that event's registration form opened (`/events?register=<slug>`). */
  linkToRegistration?: boolean;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  onDateSelect,
  linkToRegistration = false,
}) => {
  /**
   * Contains the next 3 upcoming events that will be rendered.
   */
  const [upcomingEvents, setUpcomingEvents] = React.useState<Event[]>([]);

  React.useEffect(() => {
    /**
     * Fetch events from the API and determine which three
     * should appear in the preview section.
     */
    const loadEvents = async () => {
      try {
        const allEvents = await fetchEvents();

        /**
         * 1. Keep only upcoming events.
         *
         * IMPORTANT:
         * This assumes the Event type/API uses:
         *
         *     status: 'upcoming'
         *
         * If the backend later changes this value
         * (for example to "published"), update this filter.
         *
         * 2. Sort events from earliest → latest.
         *
         * 3. Keep only the first 3.
         */
        const nextEvents = allEvents
          .filter((event: Event) => event.status === "upcoming")
          .sort((a: Event, b: Event) => a.date.getTime() - b.date.getTime())
          .slice(0, 3);

        setUpcomingEvents(nextEvents);
      } catch (error) {
        /**
         * Prevent an API failure from crashing this component.
         *
         * If this error appears:
         *   - check fetchEvents()
         *   - check the events API
         *   - check that API event fields are mapped correctly
         *     to the frontend Event type
         */
        console.error("Failed to load upcoming event previews:", error);

        setUpcomingEvents([]);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="w-full space-y-6 text-center">
      <div className="flex flex-col items-center gap-6">
        <div
          className={`grid w-full gap-6 ${
            upcomingEvents.length === 1
              ? "grid-cols-1 place-items-center"
              : upcomingEvents.length === 2
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {upcomingEvents.map((event) => {
            const { month, day } = formatEventDate(event.date);
            /**
             * Normalize the event date to local midnight.
             *
             * This prevents the event's original time-of-day
             * from affecting date selection elsewhere in the UI.
             *
             * Example:
             *
             * 2026-09-10 18:00
             *
             * becomes:
             *
             * 2026-09-10 00:00 (local time)
             */
            const eventDate = new Date(event.date);

            const calendarDate = new Date(
              eventDate.getFullYear(),
              eventDate.getMonth(),
              eventDate.getDate(),
            );

            return (
              <UpcomingEventPreview
                /**
                 * Prefer the backend event ID as the React key.
                 *
                 * IDs should uniquely identify events and are
                 * safer than constructing a key from title/date.
                 */
                key={event.id}

                /**
                 * Information actually DISPLAYED by the
                 * preview component.
                 */
                title={event.title}
                month={month}
                day={day}

                /**
                 * Date passed back when this preview
                 * is selected.
                 */
                date={calendarDate}
                href={
                  linkToRegistration
                    ? `/events?register=${event.slug}`
                    : undefined
                }
                onDateSelect={onDateSelect}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
