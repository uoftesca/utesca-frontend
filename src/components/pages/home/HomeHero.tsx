import Image from "next/image";

// --hero-h is the viewport minus the in-flow NavBar (78px: 62px logo + py-2),
// so the hero ends exactly at the fold. svh keeps it from spilling under
// mobile browser chrome.
//
// Wrapper is twice the hero's height so the hero stays pinned for one extra
// --hero-h of scrolling -- exactly long enough for the next section (Upcoming
// Event), pulled up into that range by the negative margin, to slide over it
// and reach the top of the viewport. Upcoming is opaque, positioned, and later
// in the DOM, so it paints on top. The sticky range stays bounded to this
// wrapper, so the hero can't leak further down the page.
export default function HomeHero() {
  return (
    <div className="relative mb-[calc(var(--hero-h)*-1)] h-[calc(var(--hero-h)*2)] [--hero-h:calc(100svh-78px)]">
      <section className="sticky top-0 h-[var(--hero-h)] w-full overflow-hidden">
        <Image
          src="/toronto-hero2.jpg"
          alt="Toronto Skyline"
          fill
          sizes="100vw"
          priority
          className="object-cover object-[50%_48%] brightness-100"
        />

        <div className="absolute inset-0 bg-black/25" />
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
