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
                {title && (
                    <p className='text-center text-sm font-bold leading-tight'>{title}</p>
                )}
                <p className='text-center text-5xl text-primary font-bold leading-tight'>{num}</p>
                <div className='flex flex-col'>
                    {text && (
                        <p className='text-muted-foreground text-center text-sm leading-tight'>{text}</p>
                    )}
                    {text1 && (
                        <p className='text-muted-foreground text-center text-sm leading-tight'>{text1}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default StatsCard1;
