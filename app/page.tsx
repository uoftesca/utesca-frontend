"use client";

import Container from "@/components/Container";
import Footer from "@/components/Footer";
import HomeHero from "@/components/pages/home/HomeHero";
import NavBar from "@/components/NavBar";
import AtAGlance from "@/components/pages/home/AtAGlance";
import { PartneredWith } from "@/components/pages/home/PartneredWith";
import JoinUTESCA from "@/components/pages/home/JoinUTESCA";
import VisionAndMission from "@/components/pages/about/VisionAndMission";
import PartnerWithUs from "@/components/pages/projects/PartnerWithUs";
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

        <div>
          <Scroll><VisionAndMission /></Scroll>
          <Scroll><JoinUTESCA /></Scroll>
          <Scroll><PartnerWithUs /></Scroll>
        </div>

        <section className="bg-background px-6 py-12 md:px-12 lg:px-20">
          <PartneredWith />
        </section>
      </main>
      <Footer />
    </>
  );
}
