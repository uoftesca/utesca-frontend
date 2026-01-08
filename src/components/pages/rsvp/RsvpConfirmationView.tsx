'use client';

import { useState, useEffect } from 'react';
import { useRsvpConfirmation } from '@/hooks/useRsvpConfirmation';
import { RsvpDetailsResponse } from '@/types/registration';
import { Check, X, Calendar, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface RsvpConfirmationViewProps {
    initialData: RsvpDetailsResponse;
    registrationId: string;
}

// Format date helper following SRP
function formatEventDate(dateString: string | null): { date: string; time: string } | null {
    if (!dateString) return null;

    const eventDate = new Date(dateString);
    if (Number.isNaN(eventDate.getTime())) return null;

    const dateFormatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Toronto',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const timeFormatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: 'America/Toronto',
        hour: 'numeric',
        minute: '2-digit',
        timeZoneName: 'short',
    });

    return {
        date: dateFormatter.format(eventDate),
        time: timeFormatter.format(eventDate),
    };
}

function EventDetailsCard({ event }: Readonly<{ event: RsvpDetailsResponse['event'] }>) {
    const formattedDate = formatEventDate(event.dateTime);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-card/10 backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8 mb-10"
        >
            <div className="grid gap-4">
                {formattedDate && (
                    <>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Calendar className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted">Date</p>
                                <p className="font-semibold text-white">{formattedDate.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <p className="text-sm text-muted">Time</p>
                                <p className="font-semibold text-white">{formattedDate.time}</p>
                            </div>
                        </div>
                    </>
                )}

                {event.location && (
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm text-muted">Location</p>
                            <p className="font-semibold text-white">{event.location}</p>
                        </div>
                    </div>
                )}

                {event.description && (
                    <div className="pt-4 border-t border-border">
                        <p className="text-sm text-white">{event.description}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// Pending State Component
function PendingRsvpState({
    event,
    canConfirm,
    canDecline,
    eventHasPassed,
    loading,
    onConfirm,
    onDecline,
}: Readonly<{
    event: RsvpDetailsResponse['event'];
    canConfirm: boolean;
    canDecline: boolean;
    eventHasPassed: boolean;
    loading: boolean;
    onConfirm: () => void;
    onDecline: () => void;
}>) {
    return (
        <motion.div
            key="pending"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full"
        >
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-center  mb-4 text-white"
            >
                You're <span className="text-gradient">Invited</span>.
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl font-semibold text-white text-center mb-12 max-w-md mx-auto"
            >
                {event.title}
            </motion.p>

            <EventDetailsCard event={event} />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col items-center gap-6"
            >
                <Button
                    variant="hero"
                    size="xl"
                    onClick={onConfirm}
                    disabled={!canConfirm || eventHasPassed || loading}
                    className="w-full md:w-auto min-w-[280px]"
                >
                    <Check className="w-5 h-5" />
                    {loading ? 'Confirming...' : 'Count me in!'}
                </Button>

                {canDecline && !eventHasPassed && (
                    <button
                        onClick={onDecline}
                        disabled={loading}
                        className="text-sm text-muted hover:text-white transition-colors underline underline-offset-4"
                    >
                        I won't be able to make it.
                    </button>
                )}
            </motion.div>
        </motion.div>
    );
}

// Confirmed State Component - Open/Closed Principle
function ConfirmedRsvpState({
    event,
    canDecline,
    eventHasPassed,
    loading,
    onDecline,
}: Readonly<{
    event: RsvpDetailsResponse['event'];
    canDecline: boolean;
    eventHasPassed: boolean;
    loading: boolean;
    onDecline: () => void;
}>) {
    const formattedDate = formatEventDate(event.dateTime);

    return (
        <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 rounded-full gradient-primary mx-auto mb-8 flex items-center justify-center shadow-glow"
            >
                <Check className="w-12 h-12 text-primary-foreground" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                You're <span className="text-gradient">confirmed!</span>
            </h2>

            <p className="text-lg text-muted max-w-md mx-auto mb-8">
                We can't wait to see you there.
            </p>

            {formattedDate && (
                <div className="font-mono text-sm text-muted bg-primary/20 px-4 py-2 rounded-lg inline-block mb-6">
                    See you on {formattedDate.date} at {formattedDate.time.split(',')[0]}
                </div>
            )}

            {canDecline && !eventHasPassed && (
                <div className="mt-8">
                    <button
                        onClick={onDecline}
                        disabled={loading}
                        className="text-sm text-muted hover:text-destructive transition-colors underline underline-offset-4"
                    >
                        Unable to make it? Click here to decline.
                    </button>
                </div>
            )}
        </motion.div>
    );
}

// Declined State Component
function DeclinedRsvpState() {
    return (
        <motion.div
            key="declined"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="text-center"
        >
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-muted mx-auto mb-8 flex items-center justify-center"
            >
                <X className="w-12 h-12 text-muted-foreground" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                We'll miss you!
            </h2>

            <p className="text-lg text-muted max-w-md mx-auto mb-4">
                Thanks for letting us know. We hope to see you at a future event!
            </p>

            <p className="text-sm text-muted">
                If you need to change this decision, please contact us at{' '}
                <a
                    href="mailto:uoft.esca@gmail.com"
                    className="text-primary hover:underline"
                >
                    uoft.esca@gmail.com
                </a>
                .
            </p>
        </motion.div>
    );
}

// Decline Warning Modal Component
function DeclineWarningModal({
    open,
    onClose,
    onConfirm,
    eventTitle,
    loading,
}: Readonly<{
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    eventTitle: string;
    loading: boolean;
}>) {
    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/5`0 backdrop-blur-sm z-50 flex items-center justify-center p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-card border border-border rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <h3 className="text-xl font-bold">Are you sure?</h3>
                        </div>

                        <p className="text-muted-foreground mb-2">
                            Are you sure you want to decline attendance for{' '}
                            <strong className="text-foreground">{eventTitle}</strong>?
                        </p>

                        <p className="text-sm text-destructive font-medium mb-6">
                            This action is final and cannot be undone. You won't be able to
                            change your response later.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                variant="secondary"
                                className="flex-1"
                                onClick={onClose}
                                disabled={loading}
                            >
                                Go back
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={onConfirm}
                                disabled={loading}
                            >
                                {loading ? 'Declining...' : 'Yes, decline'}
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Main Component
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

    // Handle errors with toast notifications
    useEffect(() => {
        if (error) {
            toast.error(error);
            clearError();
        }
    }, [error, clearError]);

    const handleDeclineClick = () => setShowDeclineWarning(true);

    const handleConfirmDecline = async () => {
        await declineAttendance();
        setShowDeclineWarning(false);
    };

    return (
        <div className="min-h-screen bg-[var(--rsvp-navy)] grid-pattern relative overflow-hidden">
            {/* Glow effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] gradient-glow pointer-events-none animate-glow-pulse" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[400px] gradient-glow pointer-events-none opacity-50" />

            <div className="relative z-10 container max-w-2xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center min-h-screen">
                {/* Event Passed Warning */}
                {rsvpData.eventHasPassed && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full mb-6 border-amber-300 bg-amber-50 text-amber-900 border rounded-lg p-4"
                    >
                        <div className="flex items-center gap-2 font-semibold mb-1">
                            <AlertTriangle className="w-4 h-4" />
                            Event Has Passed
                        </div>
                        <p className="text-sm">
                            This event has already occurred. RSVP changes are no longer available.
                        </p>
                    </motion.div>
                )}

                <AnimatePresence mode="wait">
                    {rsvpData.currentStatus === 'accepted' && (
                        <PendingRsvpState
                            event={rsvpData.event}
                            canConfirm={rsvpData.canConfirm}
                            canDecline={rsvpData.canDecline}
                            eventHasPassed={rsvpData.eventHasPassed}
                            loading={loading}
                            onConfirm={confirmAttendance}
                            onDecline={handleDeclineClick}
                        />
                    )}

                    {rsvpData.currentStatus === 'confirmed' && (
                        <ConfirmedRsvpState
                            event={rsvpData.event}
                            canDecline={rsvpData.canDecline}
                            eventHasPassed={rsvpData.eventHasPassed}
                            loading={loading}
                            onDecline={handleDeclineClick}
                        />
                    )}

                    {rsvpData.currentStatus === 'not_attending' && <DeclinedRsvpState />}
                </AnimatePresence>

                {/* Decline Warning Modal */}
                <DeclineWarningModal
                    open={showDeclineWarning}
                    onClose={() => setShowDeclineWarning(false)}
                    onConfirm={handleConfirmDecline}
                    eventTitle={rsvpData.event.title}
                    loading={loading}
                />
            </div>
        </div>
    );
}
