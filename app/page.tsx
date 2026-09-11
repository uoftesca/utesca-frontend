"use client";

import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import WhatDoesUTESCADo from "@/components/pages/home/WhatDoesUTESCADo";
import { PartneredWith } from "@/components/pages/home/PartneredWith";
import Stats from "@/components/pages/home/Stats";
import JoinUTESCA from "@/components/pages/home/JoinUTESCA";
import PastEvents from "@/components/pages/events/PastEvents";
import VisionAndMission from "@/components/pages/about/VisionAndMission";
import PartnerWithUs from "@/components/pages/projects/PartnerWithUs";
import Scroll from "@/components/Scroll";
import EventDetails from "@/components/pages/events/EventDetails";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />

        <div>
          <Scroll>
            <div className="w-full max-w-6xl mx-auto space-y-8 text-center">
              <h1 className="text-2xl font-bold tracking-normal md:text-4xl text-primary font-heading">
                Upcoming Events
              </h1>
              <EventDetails linkToRegistration />
            </div>
          </Scroll>
          <Scroll><WhatDoesUTESCADo /></Scroll>
          <Scroll><VisionAndMission /></Scroll>
          <Scroll><Stats /></Scroll>
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
