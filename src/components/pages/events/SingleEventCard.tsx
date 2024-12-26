import { Card, CardContent } from '@/components/ui/card';

interface SingleEventCardProps {
    month?: string;
    date?: string;
    name?: string;
    description?: string;
    className?: string;
}

const SingleEventCard: React.FC<SingleEventCardProps> = ({
    month,
    date,
    name,
    description,
    className,
}) => {
    return (
        <Card className={`bg-card border-none w-full max-w-xs ${className}`}>
            <CardContent className='flex flex-col items-center space-y-2 p-6'>
                <div className='border rounded-lg border-accent p-4'>
                    <p className='text-subtle text-center text-lg'>
                        {month}
                    </p>
                    <p className='whitespace-pre-wrap text-6xl font-medium text-black dark:text-white'>
                        {date}
                    </p>
                </div>
                <p className='text-center text-lg text-accent font-bold'>{name}</p>
                <p className='text-subtle text-center text-sm'>{description}</p>
            </CardContent>
        </Card>
    );
};

export default SingleEventCard;
