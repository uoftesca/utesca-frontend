import { Card, CardContent } from '@/components/ui/card';
import NumberTicker from '@/components/ui/number-ticker'; 

interface StatsCardProps {
    title?: string;
    num: number;
    text?: string;
    className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, num, text, className }) => {
    return (
        <Card className={`bg-card border-none w-full max-w-sm ${className}`}>
            <CardContent className='flex flex-col items-center p-6'>
                <p className='text-center text-lg text-accent font-bold' > {title} </p>
                <p className="whitespace-pre-wrap text-6xl font-medium tracking-tighter text-black dark:text-white">
                    <NumberTicker value={num} />
                </p>
                <p className='text-subtle text-center text-sm'>{text}</p>
            </CardContent>
        </Card>
    );
};

export default StatsCard;
