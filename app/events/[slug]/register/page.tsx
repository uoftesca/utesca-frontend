import { notFound } from 'next/navigation';

import { RegistrationForm } from '@/components/pages/events/RegistrationForm';
import { publicApi } from '@/lib/public-api';

type RegisterPageProps = {
    params: Promise<{ slug: string }>;
};

export default async function RegisterPage({ params }: RegisterPageProps) {
    const { slug } = await params;
    const event = await publicApi.getEventBySlug(slug);

    if (!event) {
        notFound();
    }

    console.log(event);

    return (
        <main className="min-h-screen bg-background">
            <div className="container mx-auto flex justify-center py-16 px-8 md:py-24">
                <RegistrationForm event={event} slug={slug} />
            </div>
        </main>
    );
}
