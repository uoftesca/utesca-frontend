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
            className={`bg-card border-none w-full max-w-sm shadow-none ${className}`}
        >
            <CardContent className='flex flex-col items-left p-6 gap-3'>
                <Icon className='w-12 h-12 text-accent' strokeWidth={1.5} />
                <p className='text-accent font-bold w-full text-sm text-left'>
                    {title}
                </p>
                <p className='text-subtle text-sm text-left'>{text}</p>
            </CardContent>
        </Card>
    );
};

export default MissionCard;
