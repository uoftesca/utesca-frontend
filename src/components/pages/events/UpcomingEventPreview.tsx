import { Card } from '@/components/ui/card';

interface UpcomingEventPreviewProps {
    title: string;
    month: string;
    day: string;
}

export default function UpcomingEventPreview({
    title,
    month,
    day,
}: UpcomingEventPreviewProps) {
    return (
        <Card className='relative w-full max-w-[200px] h-56 rounded-lg bg-secondary overflow-hidden p-6 mx-auto border-none'>
            <div className='flex flex-col items-center justify-between w-full h-full'>
                <div className='flex-1 flex flex-col items-center justify-center'>
                    <div className='text-2xl font-bold'>{month}</div>
                    <div className='text-4xl'>{day}</div>
                </div>
                <div className='text-md font-medium break-words line-clamp-2 text-center w-full text-accent'>
                    {title}
                </div>
            </div>
        </Card>
    );
}
