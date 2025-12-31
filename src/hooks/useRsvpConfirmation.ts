import { useState } from 'react';
import { publicApi } from '@/lib/public-api';
import { RsvpDetailsResponse } from '@/types/registration';

interface UseRsvpConfirmationReturn {
    rsvpData: RsvpDetailsResponse;
    loading: boolean;
    error: string | null;
    successMessage: string | null;
    confirmAttendance: () => Promise<void>;
    declineAttendance: () => Promise<void>;
    clearError: () => void;
}

export function useRsvpConfirmation(
    registrationId: string,
    initialData: RsvpDetailsResponse
): UseRsvpConfirmationReturn {
    const [rsvpData, setRsvpData] = useState<RsvpDetailsResponse>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const confirmAttendance = async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await publicApi.confirmRsvp(registrationId);

            // Optimistic update
            setRsvpData((prev) => ({
                ...prev,
                currentStatus: 'confirmed',
                canConfirm: false,
                canDecline: true,
                registration: {
                    ...prev.registration,
                    status: 'confirmed',
                    confirmedAt: new Date().toISOString(),
                },
            }));

            setSuccessMessage(response.message);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to confirm attendance. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const declineAttendance = async () => {
        setLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await publicApi.declineRsvp(registrationId);

            // Optimistic update
            setRsvpData((prev) => ({
                ...prev,
                currentStatus: 'not_attending',
                canConfirm: false,
                canDecline: false,
                isFinal: true,
                registration: {
                    ...prev.registration,
                    status: 'not_attending',
                },
            }));

            setSuccessMessage(response.message);
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : 'Failed to decline attendance. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    return {
        rsvpData,
        loading,
        error,
        successMessage,
        confirmAttendance,
        declineAttendance,
        clearError,
    };
}
