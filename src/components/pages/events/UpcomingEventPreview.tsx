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
            className='relative w-[500px] max-w-full h-32 rounded-lg bg-secondary overflow-hidden p-6 mx-auto border-none cursor-pointer hover:bg-secondary/80 transition-colors'
            onClick={() => onDateSelect(date)}
        >
            <div className='flex flex-row items-center w-full h-full'>

                <div className='flex flex-col items-center justify-center w-24 flex-shrink-0'>
                    <div className='text-2xl font-bold text-black'>
                        {month}
                    </div>

                    <div className='text-4xl text-black'>
                        {day}
                    </div>
                </div>

                <div className='flex-1 flex items-center justify-center px-6'>
                    <div className='text-lg font-medium text-center text-primary'>
                        {title}
                    </div>
                </div>

            </div>
        </Card>
    );
}