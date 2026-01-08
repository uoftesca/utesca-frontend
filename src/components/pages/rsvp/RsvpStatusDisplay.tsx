import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { RsvpStatus } from '@/types/registration';

interface RsvpStatusDisplayProps {
    status: RsvpStatus;
    canConfirm: boolean;
    canDecline: boolean;
    eventHasPassed: boolean;
    isFinal: boolean;
    onConfirm: () => void;
    onDecline: () => void;
    loading: boolean;
}

export function RsvpStatusDisplay({
    status,
    canConfirm,
    canDecline,
    eventHasPassed,
    onConfirm,
    onDecline,
    loading,
}: Readonly<RsvpStatusDisplayProps>) {
    // Accepted status - awaiting confirmation
    if (status === 'accepted') {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full bg-primary" />
                        Awaiting Confirmation
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Please confirm your attendance below. If you do not respond within a week of your RSVP email, you may lose your spot!
                    </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                    <Button
                        className="w-full"
                        onClick={onConfirm}
                        disabled={!canConfirm || eventHasPassed || loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Confirming...
                            </>
                        ) : (
                            <>
                                <CheckCircle2 className="mr-2 h-4 w-4" />
                                Confirm Attendance
                            </>
                        )}
                    </Button>

                    {canDecline && !eventHasPassed && (
                        <button
                            className="text-sm text-muted-foreground hover:text-destructive hover:underline"
                            onClick={onDecline}
                            disabled={loading}
                        >
                            I am no longer able to attend.
                        </button>
                    )}
                </CardFooter>
            </Card>
        );
    }

    // Confirmed status
    if (status === 'confirmed') {
        return (
            <Card className="border-emerald-300 bg-emerald-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-emerald-900">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                        Attendance Confirmed
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-emerald-900">
                        Thank you for confirming! We look forward to seeing you at
                        the event.
                    </p>
                </CardContent>
                {canDecline && !eventHasPassed && (
                    <CardFooter>
                        <button
                            className="text-sm text-emerald-900/70 hover:text-destructive hover:underline"
                            onClick={onDecline}
                            disabled={loading}
                        >
                            Unable to make it? Click here to decline.
                        </button>
                    </CardFooter>
                )}
            </Card>
        );
    }

    // Not attending status (terminal)
    if (status === 'not_attending') {
        return (
            <Card className="border-gray-300 bg-gray-50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                        <XCircle className="h-5 w-5 text-gray-600" />
                        Not Attending
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-gray-900">
                        You have declined attendance for this event. This decision
                        is final.
                    </p>
                    <p className="text-sm text-gray-600">
                        If you need to change this decision, please contact the
                        organizers at{' '}
                        <a
                            href="mailto:uoft.esca@gmail.com"
                            className="text-primary hover:underline"
                        >
                            uoft.esca@gmail.com
                        </a>
                    </p>
                </CardContent>
            </Card>
        );
    }

    return null;
}
