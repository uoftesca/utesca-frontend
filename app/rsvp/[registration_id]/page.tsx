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
        console.log(rsvpData)

        return (
            <main className="min-h-screen bg-background">
                <div className="container mx-auto flex justify-center py-16 px-8 md:py-24">
                    <RsvpConfirmationView
                        initialData={rsvpData}
                        registrationId={registration_id}
                    />
                </div>
            </main>
        );
    } catch (error) {
        // API returns 404 for invalid/inaccessible registrations
        notFound();
    }
}
