'use client';

import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

interface UpcomingEventPreviewProps {
    title: string;
    month: string;
    day: string;
    date: Date;
    href?: string;
    onDateSelect?: (date: Date) => void;
}

export default function UpcomingEventPreview({
    title,
    month,
    day,
    date,
    href,
    onDateSelect,
}: UpcomingEventPreviewProps) {
  const router = useRouter();

    const handleClick = () => {
        if (href) {
            router.push(href);
        } else {
            onDateSelect?.(date);
        }
    };
    return (
        <Card
            className='relative w-full max-w-[500px] h-32 rounded-lg bg-secondary overflow-hidden p-6 mx-auto border-none cursor-pointer hover:bg-secondary/80 transition-colors'
            onClick={handleClick}
        >
            <div className='flex flex-row items-center w-full h-full'>

                <div className='flex flex-col items-center justify-center w-24 flex-shrink-0'>
                    <div className='text-3xl font-bold text-black font-heading'>
                        {month}
                    </div>

                    <div className='text-4xl text-black font-heading'>
                        {day}
                    </div>
                </div>

                <div className='flex-1 flex items-center justify-center px-6'>
                    <div className='text-xl font-medium text-center text-primary font-heading'>
                        {title}
                    </div>
                </div>

            </div>
        </Card>
    );
}