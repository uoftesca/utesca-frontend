import Image from "next/image";

export default function OurReach() {
  return (
    <section className="relative min-h-[110vh] w-full overflow-hidden">
      <Image
        src="/our-reach.png"
        alt="Our Reach: 1.8k Instagram followers, 484 LinkedIn followers, 357 newsletter subscribers, +28k views during the past month, +2k average impressions and 800 profile visits, equalling 2681 students"
        fill
        sizes="100vw"
        className="object-cover object-bottom"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#c7bfb9] to-transparent md:h-24" />
    </section>
  );
}
