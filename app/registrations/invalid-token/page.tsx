import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RegistrationPageShell } from '@/components/pages/registrations/RegistrationPageShell';

export default function InvalidTokenPage() {
    return (
        <RegistrationPageShell>
            <h1 className="text-3xl font-semibold text-primary">This link is no longer valid</h1>
            <p className="text-muted-foreground">
                The link may have expired, already been used, or been revoked.
            </p>
            <Button asChild>
                <Link href="/events">Browse events</Link>
            </Button>
        </RegistrationPageShell>
    );
}
