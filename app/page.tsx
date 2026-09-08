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
import Scroll from "@/components/Scroll";

export default function Home() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />

        <div>
          <Scroll><WhatDoesUTESCADo /></Scroll>
          <Scroll><Stats /></Scroll>
          <Scroll><JoinUTESCA /></Scroll>
        </div>

        <section className="bg-background px-6 py-12 md:px-12 lg:px-20">
          <PartneredWith />
        </section>
      </main>
      <Footer />
    </>
  );
}
