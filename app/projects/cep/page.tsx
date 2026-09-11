import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import WhatIsCEP from "@/components/pages/home/WhatIsCEP";

export default function CEP() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Container>
          <WhatIsCEP />
        </Container>
      </main>
      <Footer />
    </>
  );
}