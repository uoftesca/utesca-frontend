import { Card, CardContent } from '@/components/ui/card';
import NumberTicker from '@/components/ui/number-ticker';

interface StatsCardProps {
    title?: string;
    num: number;
    text?: string;
    className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
    title,
    num,
    text,
    className,
}) => {
    return (
        <Card className={`bg-card border-none w-full max-w-sm h-full transition duration-200 hover:-translate-y-1 hover:shadow-lg ${className}`}>
            <CardContent className='flex h-full flex-col items-center justify-center space-y-2 p-6'>
                <p className='text-center text-xl text-primary font-bold font-heading'>
                    {title}
                </p>
                <p className='whitespace-pre-wrap text-7xl font-medium text-black dark:text-white font-heading'>
                    <NumberTicker value={num} />
                </p>
                <p className='text-card-foreground text-center text-lg'>{text}</p>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
