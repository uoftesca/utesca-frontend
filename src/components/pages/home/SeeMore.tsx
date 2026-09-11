"use client";

import Link from "next/link";
import ShimmerButton from "@/components/ui/shimmer-button";

interface SeeMoreProps {
  link: string;
  text?: string;
  className?: string;
}

const SeeMore: React.FC<SeeMoreProps> = ({
  link,
  text = "See More",
  className,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (!link.startsWith("#")) return;
    e.preventDefault();
    document.querySelector(link)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Link href={link} onClick={handleClick} className="w-full h-full flex">
      <ShimmerButton
        borderRadius="0.5rem"
        background="var(--primary)"
        className={`w-full h-full flex-1 text-primary-foreground ${className || ""}`}
      >
        <span className="text-xl text-primary-foreground">{text}</span>
      </ShimmerButton>
    </Link>
  );
};

export default SeeMore;
