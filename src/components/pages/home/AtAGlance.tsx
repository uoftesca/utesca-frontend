"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import Reveal from "@/components/Reveal";

const DESCRIPTION =
  "UTESCA is the premier engineering consulting club at UofT. We bridge engineering and consulting for students who are interested in pursuing a career in consulting.";

const FAST_FACTS = [
  { num: "80", label: "Student Executives" },
  { num: "30", label: "Projects Since 2020" },
  { num: "15", label: "Disciplines Engaged" },
];

// Handshake image's solid border colour, and where its arms end, as % of the
// image box (measured from public/handshake.png). The bars extend each arm off
// the edge of the screen so the handshake spans the whole diagonal.
const HANDSHAKE_RED = "rgb(165, 73, 72)";
const LEFT_ARM = { end: "88%", top: "1%", height: "49.7%" }; // `end` = right offset
const RIGHT_ARM = { start: "86%", top: "35.2%", height: "56.4%" };

// Steeper than this and the stats on the band get hard to read (phones).
const MAX_ANGLE_DEG = 40;

// Sliding diagonal band: starts over the mascot, ends over the glance text.
export default function AtAGlance() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Tilt the band to the section's own corner-to-corner diagonal.
  const [angle, setAngle] = useState(32);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const update = () => {
      const deg = (Math.atan2(el.clientHeight, el.clientWidth) * 180) / Math.PI;
      setAngle(Math.min(deg, MAX_ANGLE_DEG));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const bandTop = useTransform(scrollYProgress, [0, 1], ["78%", "18%"]);

  const glanceOpacity = useTransform(scrollYProgress, [0.3, 0.5], [1, 0]);
  const mascotOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);

  return (
    <div ref={wrapperRef} className="relative h-[200vh]">
      <section
        ref={sectionRef}
        className="sticky top-0 flex min-h-screen w-full flex-col justify-between gap-12 overflow-hidden bg-primary px-6 py-16 text-primary-foreground md:px-12 lg:px-20">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent md:h-40" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#77302d] to-transparent md:h-40" />

        <motion.div style={{ opacity: glanceOpacity }} className="relative z-0">
          <Reveal className="max-w-3xl text-left">
            <h2 className="text-7xl font-black leading-[0.9] tracking-tight md:text-9xl">
              UTESCA{" "}
              <span className="align-baseline font-sans text-xl font-normal text-primary-foreground/60 md:text-3xl">
                Since 2020
              </span>
              <br />
              At A Glance
            </h2>
            <p className="mt-8 text-2xl font-bold text-primary-foreground/90 md:text-3xl">
              {DESCRIPTION}
            </p>
            <p className="mt-8 text-xl italic text-primary-foreground/70 md:text-2xl">
              &ldquo;To push the boundaries of engineering through innovation,
              technology, and creative problem-solving.&rdquo;
            </p>
          </Reveal>
        </motion.div>

        <motion.div
          style={{ opacity: mascotOpacity }}
          className="relative z-0 mb-4 ml-auto flex items-center gap-8 md:mb-8 md:gap-12"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative h-80 w-80 shrink-0 md:h-[28rem] md:w-[28rem]"
          >
            <Image
              src="/utesca-mascot-cntower.png"
              alt="UTESCA mascot in front of the CN tower"
              fill
              className="object-contain"
              style={{
                filter:
                  "drop-shadow(2px 0 0 #fff) drop-shadow(-2px 0 0 #fff) drop-shadow(0 2px 0 #fff) drop-shadow(0 -2px 0 #fff)",
              }}
            />
          </motion.div>

          <div className="text-left">
            <h3 className="text-7xl font-black leading-[0.9] tracking-tight md:text-9xl">
              Meet Our
              <br />
              Mascot
            </h3>
            <ul className="mt-8 list-inside list-disc space-y-4 text-2xl text-primary-foreground/90 md:text-3xl">
              <li>Unites & Engage</li>
              <li>Quick Team</li>
              <li>Problem Solver</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          // Centring goes through motion too: a motion `rotate` replaces any CSS
          // transform classes on the same element.
          style={{ top: bandTop, rotate: -angle, x: "-50%", y: "-50%" }}
          className="absolute left-1/2 z-20 [filter:drop-shadow(0_30px_40px_rgba(0,0,0,0.55))]"
        >
          {/* Hands sit toward the top-right end of the diagonal; the left arm's
              bar runs down to the bottom-left and carries the stats. */}
          <div className="relative aspect-[16/9] w-[22rem] translate-x-[49%] sm:w-[40rem] sm:translate-x-[67%] md:w-[56rem] md:translate-x-[78%]">
            {/* Arm extensions, behind the image so its ragged ends overlap them. */}
            <div
              className="absolute flex w-[300vmax] items-center justify-end pr-6 sm:pr-16 md:pr-32"
              style={{
                right: LEFT_ARM.end,
                top: LEFT_ARM.top,
                height: LEFT_ARM.height,
                backgroundColor: HANDSHAKE_RED,
              }}
            >
              <div className="grid grid-cols-3 gap-1 text-center text-white [text-shadow:0_4px_18px_rgba(0,0,0,0.45)] sm:gap-10 md:gap-14">
                {FAST_FACTS.map((fact) => (
                  <div key={fact.label} className="max-w-[4.5rem] sm:max-w-[9rem] md:max-w-[11rem]">
                    <p className="text-3xl font-black font-heading sm:text-6xl md:text-8xl">
                      {fact.num}
                    </p>
                    <p className="text-[0.65rem] font-black uppercase leading-tight tracking-wide text-white/90 sm:text-base md:text-lg">
                      {fact.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="absolute w-[300vmax]"
              style={{
                left: RIGHT_ARM.start,
                top: RIGHT_ARM.top,
                height: RIGHT_ARM.height,
                backgroundColor: HANDSHAKE_RED,
              }}
            />
            <Image
              src="/handshake.png"
              alt=""
              fill
              sizes="(min-width: 768px) 56rem, (min-width: 640px) 40rem, 22rem"
              className="object-contain"
            />
          </div>
        </motion.div>
      </section>
    </div>
  );
}
