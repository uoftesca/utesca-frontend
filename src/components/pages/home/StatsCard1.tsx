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
            <CardContent className='flex h-full flex-col items-center justify-center space-y-2 p-6'>
                {title && (
                    <p className='text-center text-sm font-bold'>{title}</p>
                )}
                <p className='text-center text-5xl text-accent font-bold'>{num}</p>
                <div className='space-y-1'>
                    {text && (
                        <p className='text-subtle text-center text-sm'>{text}</p>
                    )}
                    {text1 && (
                        <p className='text-subtle text-center text-sm'>{text1}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default StatsCard1;
