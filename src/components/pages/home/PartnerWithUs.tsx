"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import Reveal from "@/components/Reveal";

const SLIDES = [
  "/partnerwithus/picture1.png",
  "/partnerwithus/picture2.png",
  "/partnerwithus/picture3.png",
  "/partnerwithus/picture4.png",
];

const INTERVAL_MS = 5000;

// Home-only slideshow, not the shared projects/PartnerWithUs.tsx. The current
// slide sits centred and uncropped; a blurred copy of it fills the section.
export default function PartnerWithUs() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });

  // 0 → 1 over INTERVAL_MS; drives the active dot's fill bar.
  const progress = useMotionValue(0);

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i + delta + SLIDES.length) % SLIDES.length),
    [],
  );

  // Any slide change (auto, arrows, dots) starts a fresh, empty bar.
  useEffect(() => {
    progress.set(0);
  }, [index, progress]);

  // Fills the bar only while on screen and not hovered; advances when full.
  // delta is capped so returning to a backgrounded tab doesn't skip ahead.
  useAnimationFrame((_, delta) => {
    if (paused || reduceMotion || !inView) return;
    const next = progress.get() + Math.min(delta, 100) / INTERVAL_MS;
    if (next >= 1) go(1);
    else progress.set(next);
  });

  // The outgoing slide stays opaque underneath while the new one fades in on
  // top, so the backdrop never shows through mid-transition.
  const fade = {
    initial: { opacity: 0, zIndex: 1 },
    animate: { opacity: 1, zIndex: 1 },
    exit: { opacity: 1, zIndex: 0 },
    transition: { duration: reduceMotion ? 0 : 0.8, ease: "easeInOut" as const },
  };

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Partner with us"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black px-4 py-20 md:py-28"
    >
      {/* Blurred backdrop of the current slide */}
      <AnimatePresence initial={false}>
        <motion.div key={SLIDES[index]} className="absolute inset-0" {...fade}>
          <Image
            src={SLIDES[index]}
            alt=""
            fill
            sizes="50vw"
            className="scale-110 object-cover blur-3xl brightness-50"
          />
        </motion.div>
      </AnimatePresence>

      {/* Seam fades: top matches AtAGlance's bottom, bottom matches the
          Partnered With section below. z-[2] keeps them above the backdrop
          (whose crossfade layers use z-index 0/1) and below the content. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-64 bg-gradient-to-b from-[#77302d] via-[#77302d]/60 to-transparent md:h-96" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-b from-transparent via-[#c7bfb9]/60 to-[#c7bfb9] md:h-64" />

      <Reveal className="relative z-10 mb-10 md:mb-14">
        <h2 className="text-center text-5xl font-black uppercase tracking-tight text-white md:text-8xl">
          Partner With Us
        </h2>
      </Reveal>

      <div className="relative z-10 w-full max-w-7xl md:w-[70%]">
        <div
          className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={SLIDES[index]}
              className="absolute inset-0"
              {...fade}
            >
              <Image
                src={SLIDES[index]}
                alt={`Partner with UTESCA, slide ${index + 1} of ${SLIDES.length}`}
                fill
                sizes="(min-width: 768px) 80vw, 100vw"
                priority={index === 0}
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>

          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {SLIDES.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`relative h-2 overflow-hidden rounded-full transition-all ${
                i === index ? "w-12 bg-white/30" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
            >
              {i === index && (
                <motion.span
                  className="absolute inset-0 origin-left bg-white"
                  style={{ scaleX: reduceMotion ? 1 : progress }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
