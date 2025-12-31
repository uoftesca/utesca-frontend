'use client';

import { useState } from 'react';
import { useRsvpConfirmation } from '@/hooks/useRsvpConfirmation';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { EventDetailsCard } from './EventDetailsCard';
import { RsvpStatusDisplay } from './RsvpStatusDisplay';
import { DeclineWarningSheet } from './DeclineWarningSheet';
import { RsvpDetailsResponse } from '@/types/registration';

interface RsvpConfirmationViewProps {
    initialData: RsvpDetailsResponse;
    registrationId: string;
}

export function RsvpConfirmationView({
    initialData,
    registrationId,
}: Readonly<RsvpConfirmationViewProps>) {
    const [showDeclineWarning, setShowDeclineWarning] = useState(false);

    const {
        rsvpData,
        loading,
        error,
        confirmAttendance,
        declineAttendance,
        clearError,
    } = useRsvpConfirmation(registrationId, initialData);

    const handleDeclineClick = () => setShowDeclineWarning(true);

    const handleConfirmDecline = async () => {
        await declineAttendance();
        setShowDeclineWarning(false);
    };

    return (
        <div className="w-full max-w-3xl space-y-6">
            {/* Error Alert */}
            {error && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription className="flex items-center justify-between">
                        <span>{error}</span>
                        <button
                            onClick={clearError}
                            className="text-sm underline hover:no-underline"
                        >
                            Dismiss
                        </button>
                    </AlertDescription>
                </Alert>
            )}

            {/* Success Message */}
            {/* {successMessage && (
                <Alert className="border-emerald-300 bg-emerald-50 text-emerald-900">
                    <AlertTitle>Success</AlertTitle>
                    <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
            )} */}

            {/* Event Passed Warning */}
            {rsvpData.eventHasPassed && (
                <Alert className="border-amber-300 bg-amber-50 text-amber-900">
                    <AlertTitle>Event Has Passed</AlertTitle>
                    <AlertDescription>
                        This event has already occurred. RSVP changes are no longer
                        available.
                    </AlertDescription>
                </Alert>
            )}

            {/* Event Details */}
            <EventDetailsCard event={rsvpData.event} />

            {/* Status-Based Display */}
            <RsvpStatusDisplay
                status={rsvpData.currentStatus}
                canConfirm={rsvpData.canConfirm}
                canDecline={rsvpData.canDecline}
                eventHasPassed={rsvpData.eventHasPassed}
                isFinal={rsvpData.isFinal}
                onConfirm={confirmAttendance}
                onDecline={handleDeclineClick}
                loading={loading}
            />

            {/* Decline Warning Modal */}
            <DeclineWarningSheet
                open={showDeclineWarning}
                onOpenChange={setShowDeclineWarning}
                onConfirm={handleConfirmDecline}
                eventTitle={rsvpData.event.title}
                loading={loading}
            />
        </div>
    );
}
