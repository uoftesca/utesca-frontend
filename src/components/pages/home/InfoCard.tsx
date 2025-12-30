import { Card, CardContent } from '@/components/ui/card';

interface InfoCardProps {
    title?: string;
    text: string;
    className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({title, text, className }) => {
    return (
        <Card className={`bg-card border-none h-full ${className}`}>
            <CardContent className='flex h-full flex-col items-center justify-center p-6 space-y-2'>
                {title && (
                    <p className='text-center text-lg text-primary font-bold'>{title}</p>
                )}
                <p className='text-muted-foreground text-center text-sm'>{text}</p>
            </CardContent>
        </Card>
    );
};

export default InfoCard;
