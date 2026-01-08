import { Card } from '@/components/ui/card';

interface UpcomingEventPreviewProps {
    title: string;
    month: string;
    day: string;
    date: Date;
    onDateSelect: (date: Date) => void;
}

export default function UpcomingEventPreview({
    title,
    month,
    day,
    date,
    onDateSelect,
}: UpcomingEventPreviewProps) {
    return (
        <Card
            className='relative w-full h-56 max-w-[200px] rounded-lg bg-secondary overflow-hidden p-6 mx-auto border-none cursor-pointer hover:bg-secondary/80 transition-colors'
            onClick={() => onDateSelect(date)}
        >
            <div className='flex flex-col items-center justify-between w-full h-full'>
                <div className='flex-1 flex flex-col items-center justify-center'>
                    <div className='text-2xl font-bold text-black'>{month}</div>
                    <div className='text-4xl text-black'>{day}</div>
                </div>
                <div className='text-md font-medium break-words line-clamp-2 text-center w-full text-primary'>
                    {title}
                </div>
            </div>
        </Card>
    );
}
