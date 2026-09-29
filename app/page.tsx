"use client";

import Footer from "@/components/Footer";
import HomeHero from "@/components/pages/home/HomeHero";
import NavBar from "@/components/NavBar";
import AtAGlance from "@/components/pages/home/AtAGlance";
import { PartneredWith } from "@/components/pages/home/PartneredWith";
import PartnerWithUs from "@/components/pages/home/PartnerWithUs";
import OurReach from "@/components/pages/home/OurReach";
import EventsShowcase from "@/components/pages/home/EventsShowcase";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <HomeHero />

        <EventsShowcase />

        <AtAGlance />

        <PartnerWithUs />

        <section className="bg-[#c7bfb9] px-6 py-6 md:px-12 md:py-8 lg:px-20">
          <PartneredWith />
        </section>

        <OurReach />
      </main>
      <Footer />
    </>
  );
}
