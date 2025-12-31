import { notFound } from 'next/navigation';
import { publicApi } from '@/lib/public-api';
import { RsvpConfirmationView } from '@/components/pages/rsvp/RsvpConfirmationView';

type RsvpPageProps = {
    params: Promise<{ registration_id: string }>;
};

export default async function RsvpPage({ params }: RsvpPageProps) {
    const { registration_id } = await params;

    try {
        const rsvpData = await publicApi.getRsvpDetails(registration_id);

        return (
            <RsvpConfirmationView
                initialData={rsvpData}
                registrationId={registration_id}
            />
        );
    } catch (error) {
        // API returns 404 for invalid/inaccessible registrations
        notFound();
    }
}
