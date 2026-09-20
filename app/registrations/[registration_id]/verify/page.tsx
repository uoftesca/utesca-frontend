'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { publicApi } from '@/lib/public-api';
import { Button } from '@/components/ui/button';
import { RegistrationPageShell } from '@/components/pages/registrations/RegistrationPageShell';

export default function VerifyRegistrationPage() {
    const { registration_id: registrationId } = useParams<{ registration_id: string }>();
    const router = useRouter();
    const token = useSearchParams().get('token');
    const started = useRef(false);
    const [status, setStatus] = useState<'loading' | 'success'>('loading');
    const [message, setMessage] = useState('Verifying your registration…');

    useEffect(() => {
        if (started.current) return;
        started.current = true;
        if (!token) {
            router.replace('/registrations/invalid-token');
            return;
        }
        window.history.replaceState({}, '', window.location.pathname);
        publicApi.verifyRegistration(registrationId, token)
            .then((result) => {
                setStatus('success');
                setMessage(result.status === 'confirmed'
                    ? 'Your registration is confirmed.'
                    : result.status === 'waitlist'
                        ? 'Your application is on the waitlist.'
                        : 'Your application has been received and is under review.');
            })
            .catch(() => router.replace('/registrations/invalid-token'));
    }, [registrationId, router, token]);

    return (
        <RegistrationPageShell>
            {status === 'loading' && <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />}
            <h1 className="text-3xl font-semibold text-primary">{status === 'loading' ? 'Please wait' : 'Email verified'}</h1>
            <p className="text-muted-foreground">{message}</p>
            {status === 'success' && (
                <Button asChild>
                    <Link href="/events">Browse events</Link>
                </Button>
            )}
        </RegistrationPageShell>
    );
}
