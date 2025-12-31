import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { RsvpEventDetails } from '@/types/registration';

interface EventDetailsCardProps {
    event: RsvpEventDetails;
}

function formatDate(dateString: string | null): string | null {
    if (!dateString) return null;

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return null;

    return new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Toronto',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
    }).format(date);
}

export function EventDetailsCard({ event }: EventDetailsCardProps) {
    const formattedDate = formatDate(event.dateTime);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {formattedDate && (
                    <div className="flex items-center gap-2 text-foreground">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formattedDate}</span>
                    </div>
                )}

                {event.location && (
                    <div className="flex items-center gap-2 text-foreground">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                    </div>
                )}

                {event.description && (
                    <p className="text-sm text-muted-foreground pt-2">
                        {event.description}
                    </p>
                )}
            </CardContent>
        </Card>
    );
}
