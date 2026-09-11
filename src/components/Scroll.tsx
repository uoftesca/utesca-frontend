interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "blush" | "brand";
}

const TONES = {
  default: "bg-background text-foreground",
  blush: "bg-secondary text-secondary-foreground",       // light maroon/pink
  brand: "bg-primary text-primary-foreground",           // full maroon
};

export default function Scroll({
  children,
  className = "",
  tone = "default",
}: ScrollSectionProps) {
  return (
    <section
      className={`sticky top-0 flex min-h-[50vh] items-center overflow-hidden border-t border-border ${TONES[tone]} ${className}`}
    >
      <div className='w-full px-6 py-10 md:px-12 lg:px-20'>
        {children}
      </div>
    </section>
  );
}
