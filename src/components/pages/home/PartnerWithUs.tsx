import Image from "next/image";

import Reveal from "@/components/Reveal";

// Home-only banner, not the shared projects/PartnerWithUs.tsx.
export default function PartnerWithUs() {
  return (
    <section className="relative flex min-h-[110vh] w-full items-start justify-center overflow-hidden pt-16 md:pt-24">
      <Image
        src="/partner-background2.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-bottom"
      />
      <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/70 to-transparent" />
      {/* Above the black overlay so the top edge is pure #77302d, matching
          AtAGlance's bottom fade -- no visible seam. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#77302d] to-transparent md:h-64" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-[#c7bfb9] md:h-24" />

      <Reveal className="relative z-10">
        <h2 className="text-center text-6xl font-black uppercase tracking-tight text-white md:text-9xl">
          Partner With Us
        </h2>
      </Reveal>
    </section>
  );
}
