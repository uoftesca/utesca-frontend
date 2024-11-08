import { Card, CardContent } from '@/components/ui/card';

interface InfoCardProps {
    title?: string;
    text: string;
    className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({title, text, className }) => {
    return (
        <Card className={`bg-card border-none w-full max-w-sm ${className}`}>
            <CardContent className='flex flex-col items-center p-6'>
                <p className='text-center text-lg text-accent font-bold' > {title} </p>
                <p className='text-subtle text-center text-sm'>{text}</p>
            </CardContent>
        </Card>
    );
};

export default InfoCard;
