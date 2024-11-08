import { Card, CardContent } from '@/components/ui/card';

interface StatsCard1Props {
    title?: string;
    num: string;
    text?: string;
    text1?: string;

    className?: string;
}

const StatsCard1: React.FC<StatsCard1Props> = ({
    title,
    num,
    text,
    text1,
    className,
}) => {
    return (
        <Card className={`bg-card border-none w-full max-w-sm ${className}`}>
            <CardContent className='flex h-full flex-col items-center justify-center p-6'>
                <p className='text-center text-sm font-bold'> {title} </p>
                <p className='text-center text-6xl text-accent font-bold'>
                    {' '}
                    {num}{' '}
                </p>
                <p className='text-subtle text-center text-sm'>{text}</p>
                <p className='text-subtle text-center text-sm'>{text1}</p>
            </CardContent>
        </Card>
    );
};

export default StatsCard1;
