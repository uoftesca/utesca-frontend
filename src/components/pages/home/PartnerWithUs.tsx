import Image from "next/image";

import Reveal from "@/components/Reveal";

// Home-only Partner With Us banner (not the shared component used on
// the projects page).
export default function PartnerWithUs() {
  return (
    <section className="relative flex min-h-[110vh] w-full items-start justify-center overflow-hidden pt-16 md:pt-24">
      <Image
        src="/partner-background.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom"
      />
      {/* At A Glance's sticky red releases right into this section's top
          edge, so it's a flat-red-to-photo cut, not something a blur on
          this image can soften. Fade from the same red instead. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary to-transparent md:h-64" />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/70 to-transparent" />

      <Reveal className="relative z-10">
        <h2 className="text-center text-6xl font-black uppercase tracking-tight text-white md:text-9xl">
          Partner With Us
        </h2>
      </Reveal>
    </section>
  );
}
