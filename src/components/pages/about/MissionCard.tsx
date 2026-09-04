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
        <Card className={`bg-card border-none w-full max-w-sm h-full ${className}`}>
            <CardContent className='flex h-full flex-col items-center justify-start p-6'>
                <Icon className='w-12 h-12 text-primary mb-4' />
                <p className='text-center text-lg text-primary font-bold'>
                    {title}
                </p>
                <p className='text-muted-foreground text-center text-sm'>
                    {text}
                </p>
            </CardContent>
        </Card>
    );
};

export default MissionCard;