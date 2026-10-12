import Image from "next/image";

// Wrapper div matches the section's height so the sticky range stays bounded to itself.
// Height is viewport-relative and capped below 100vh (not the image's own
// aspect ratio) so it's always shorter than the viewport -- Upcoming Event's
// sticky overtake needs the reveal to kick in immediately on scroll,
// regardless of screen size, rather than only in the last stretch of a
// very tall hero.
export default function HomeHero() {
  return (
    <div className="relative h-[70vh] md:h-[80vh]">
      <section className="sticky top-0 h-[70vh] w-full overflow-hidden md:h-[80vh]">
        <Image
          src="/toronto-hero.jpg"
          alt="Toronto Skyline"
          fill
          sizes="100vw"
          priority
          className="object-cover object-bottom brightness-90"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 motion-reduce:animate-none text-center">
            <h1 className="text-6xl font-black tracking-tight text-white md:text-9xl">
              UTESCA
            </h1>
            <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-primary" />
          </div>
        </div>
      </section>
    </div>
  );
}
