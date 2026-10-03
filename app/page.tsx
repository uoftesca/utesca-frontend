"use client";

import Container from "@/components/Container";
import Footer from "@/components/Footer";
import HomeHero from "@/components/pages/home/HomeHero";
import NavBar from "@/components/NavBar";
import AtAGlance from "@/components/pages/home/AtAGlance";
import { PartneredWith } from "@/components/pages/home/PartneredWith";
import JoinUTESCA from "@/components/pages/home/JoinUTESCA";
import VisionAndMission from "@/components/pages/about/VisionAndMission";
import PartnerWithUs from "@/components/pages/home/PartnerWithUs";
import OurReach from "@/components/pages/home/OurReach";
import Scroll from "@/components/Scroll";
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

        <div>
          <Scroll><VisionAndMission /></Scroll>
          <Scroll><JoinUTESCA /></Scroll>
        </div>
      </main>
      <Footer />
    </>
  );
}
