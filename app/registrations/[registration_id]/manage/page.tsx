'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { publicApi } from '@/lib/public-api';
import { Button } from '@/components/ui/button';
import { ManagementActionResponse, RegistrationSummary, RsvpDeclineResponse } from '@/types/registration';
import { RegistrationPageShell } from '@/components/pages/registrations/RegistrationPageShell';

export default function ManageRegistrationPage() {
    const { registration_id: registrationId } = useParams<{ registration_id: string }>();
    const router = useRouter();
    const token = useSearchParams().get('token');
    const started = useRef(false);
    const [registration, setRegistration] = useState<RegistrationSummary | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [working, setWorking] = useState(false);
    const [pendingAction, setPendingAction] = useState<'withdraw' | 'decline' | null>(null);

    useEffect(() => {
        if (started.current) return;
        started.current = true;
        if (!token) {
            router.replace('/registrations/invalid-token');
            return;
        }
        window.history.replaceState({}, '', window.location.pathname);
        publicApi.createManagementSession(registrationId, token)
            .then((result) => {
                if (!result.registration) throw new Error('Registration was not returned');
                setRegistration(result.registration);
            })
            .catch(() => router.replace('/registrations/invalid-token'))
            .finally(() => setLoading(false));
    }, [registrationId, router, token]);

    const action = async (request: () => Promise<ManagementActionResponse | RsvpDeclineResponse>) => {
        setWorking(true);
        setActionError(null);
        try {
            const result = await request();
            setRegistration((current) => current ? { ...current, status: result.status } : current);
            setPendingAction(null);
        } catch {
            setActionError('This action could not be completed.');
        } finally {
            setWorking(false);
        }
    };

    if (loading) {
        return <RegistrationPageShell><p className="text-muted-foreground">Opening your secure management page…</p></RegistrationPageShell>;
    }
    if (!registration) return null;

    const canWithdraw = ['submitted', 'waitlist'].includes(registration.status);
    const canDecline = ['accepted', 'confirmed'].includes(registration.status);
    const isTerminal = ['withdrawn', 'not_attending'].includes(registration.status);

    return (
        <RegistrationPageShell>
            <h1 className="text-3xl font-semibold text-primary">Manage your registration</h1>
            <p className="text-muted-foreground">
                Current status:{' '}
                <span className="font-semibold text-foreground">{registration.status.replace('_', ' ')}</span>
            </p>
            {actionError && <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{actionError}</p>}
            {isTerminal && (
                <p className="rounded-md border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
                    This action is final. Your registration can no longer be changed.
                </p>
            )}
            {pendingAction && (
                <div className="space-y-4 rounded-md border bg-card p-4">
                    <p className="text-sm text-muted-foreground">
                        {pendingAction === 'withdraw'
                            ? 'Withdraw this application? This cannot be undone.'
                            : 'Cancel your RSVP? This cannot be undone.'}
                    </p>
                    <div className="flex justify-center gap-3">
                        <Button variant="outline" disabled={working} onClick={() => setPendingAction(null)}>
                            Keep registration
                        </Button>
                        <Button
                            variant="destructive"
                            disabled={working}
                            onClick={() => action(() => pendingAction === 'withdraw'
                                ? publicApi.withdrawRegistration(registrationId)
                                : publicApi.declineRsvp(registrationId))}
                        >
                            {working ? 'Submitting…' : 'Confirm'}
                        </Button>
                    </div>
                </div>
            )}
            {canWithdraw && !pendingAction && (
                <Button disabled={working} onClick={() => setPendingAction('withdraw')}>
                    Withdraw application
                </Button>
            )}
            {canDecline && !pendingAction && (
                <Button variant="outline" disabled={working} onClick={() => setPendingAction('decline')}>
                    Cancel RSVP
                </Button>
            )}
        </RegistrationPageShell>
    );
}
