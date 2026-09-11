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
        <Card className={`bg-card border-none w-full max-w-md min-h-64 ${className}`}>
            <CardContent className='flex h-full flex-col items-center justify-center p-10'>
                {title && (
                    <p className='text-center text-lg font-bold leading-tight font-heading'>{title}</p>
                )}
                <p className='text-center text-6xl text-primary font-bold leading-tight font-heading'>{num}</p>
                <div className='flex flex-col'>
                    {text && (
                        <p className='text-muted-foreground text-center text-base font-medium leading-tight'>{text}</p>
                    )}
                    {text1 && (
                        <p className='text-muted-foreground text-center text-base font-medium leading-tight'>{text1}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default StatsCard1;
