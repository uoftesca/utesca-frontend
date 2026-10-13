'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { publicApi } from '@/lib/public-api';
import { RsvpConfirmationView } from '@/components/pages/rsvp/RsvpConfirmationView';
import { RegistrationPageShell } from '@/components/pages/registrations/RegistrationPageShell';
import { RsvpDetailsResponse } from '@/types/registration';

export default function RegistrationRsvpPage() {
    const { registration_id: registrationId } = useParams<{ registration_id: string }>();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [token] = useState(() => searchParams.get('token'));
    const started = useRef(false);
    const [data, setData] = useState<RsvpDetailsResponse | null>(null);

    useEffect(() => {
        if (started.current) return;
        started.current = true;
        if (!token) {
            router.replace('/registrations/invalid-token');
            return;
        }
        window.history.replaceState({}, '', window.location.pathname);
        publicApi.getRsvpDetails(registrationId)
            .then(setData)
            .catch(() => router.replace('/registrations/invalid-token'));
    }, [registrationId, router, token]);

    if (!data) {
        return (
            <RegistrationPageShell>
                <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                <p className="text-muted-foreground">Loading RSVP details…</p>
            </RegistrationPageShell>
        );
    }

    return <RsvpConfirmationView initialData={data} registrationId={registrationId} token={token!} />;
}
