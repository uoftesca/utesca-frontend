import { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

interface MissionCardProps {
    Icon: LucideIcon;
    title: string;
    text: string;
    className?: string;
}

const MissionCard: React.FC<MissionCardProps> = ({
    Icon,
    title,
    text,
    className,
}) => {
    return (
        <Card
            className={`bg-card border-none w-full max-w-sm h-full shadow-none transition duration-200 hover:-translate-y-1 hover:shadow-lg ${className}`}
        >
            <CardContent className='flex h-full flex-col items-center justify-start p-6 gap-3'>
                <Icon className='w-12 h-12 text-primary' strokeWidth={1.5} />
                <p className='text-primary font-bold w-full text-xl text-center font-heading'>
                    {title}
                </p>
                <p className='text-muted-foreground text-md text-center'>{text}</p>
            </CardContent>
        </Card>
    );
};

export default MissionCard;
