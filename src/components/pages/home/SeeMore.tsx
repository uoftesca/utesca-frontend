import Link from 'next/link';
import ShimmerButton from '@/components/ui/shimmer-button';

interface SeeMoreProps {
    link: string;
    text?: string;
    className?: string;
}

const SeeMore: React.FC<SeeMoreProps> = ({ link, text = "See More", className }) => {
    return (
        <Link href={link} className="w-full h-full flex">
            <ShimmerButton
                borderRadius="0.5rem"
                background="var(--primary)"
                className={`w-full h-full flex-1 text-primary-foreground ${className || ''}`}
            >
                <span className="text-sm text-primary-foreground">{text}</span>
            </ShimmerButton>
        </Link>
    );
};

export default SeeMore;
