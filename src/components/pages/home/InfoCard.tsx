import { Card, CardContent } from '@/components/ui/card';

interface InfoCardProps {
    title?: string;
    text: string;
    className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({title, text, className }) => {
    return (
        <Card className={`bg-card border-none h-full min-h-64 transition duration-200 hover:-translate-y-1 hover:shadow-xl ${className}`}>
            <CardContent className='flex h-full flex-col items-center justify-center p-10 space-y-3'>
                {title && (
                    <p className='text-center text-xl text-primary font-bold font-heading'>{title}</p>
                )}
                <p className='text-muted-foreground text-center text-base font-medium'>{text}</p>
            </CardContent>
        </Card>
    );
};

export default InfoCard;
