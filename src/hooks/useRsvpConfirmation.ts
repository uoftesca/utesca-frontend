import { useState } from 'react';
import { publicApi } from '@/lib/public-api';
import { RsvpDetailsResponse } from '@/types/registration';

interface UseRsvpConfirmationReturn {
    rsvpData: RsvpDetailsResponse;
    loading: boolean;
    error: string | null;
    confirmAttendance: () => Promise<void>;
    clearError: () => void;
}

export function useRsvpConfirmation(
    registrationId: string,
    initialData: RsvpDetailsResponse,
    token: string
): UseRsvpConfirmationReturn {
    const [rsvpData, setRsvpData] = useState<RsvpDetailsResponse>(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const confirmAttendance = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await publicApi.confirmRsvp(registrationId, token);

            // Optimistic update
            setRsvpData((prev) => ({
                ...prev,
                currentStatus: 'confirmed',
                canConfirm: false,
                canDecline: false,
                registration: {
                    ...prev.registration,
                    status: 'confirmed',
                    confirmedAt: new Date().toISOString(),
                },
            }));

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

    const clearError = () => setError(null);

    return {
        rsvpData,
        loading,
        error,
        confirmAttendance,
        clearError,
    };
}
