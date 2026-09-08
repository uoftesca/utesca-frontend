interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Scroll({
  children,
  className = "",
}: ScrollSectionProps) {
  return (
    <section
      className={`sticky top-0 flex min-h-[50vh] items-center overflow-hidden border-t border-border bg-background ${className}`}
    >
      <div className='w-full px-6 py-10 md:px-12 lg:px-20'>
        {children}
      </div>
    </section>
  );
}
