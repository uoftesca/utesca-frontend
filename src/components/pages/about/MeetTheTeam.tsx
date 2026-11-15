import React from "react";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import TeamNotebook from "./notebook/TeamNotebook";
import { TEAM_NOTEBOOKS } from "./notebook/teams";

/**
 * MeetTheTeam component displays the executive team as one flippable
 * notebook per team (configured in ./notebook/teams.ts).
 */
const MeetTheTeam: React.FC = () => {
  return (
    <div className="space-y-12">
      <Reveal className="text-center space-y-4">
        <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-primary text-balance">
          Meet the Executive Team
        </h1>

        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground text-balance">
          These are the people that make up the UTESCA team.
          <br /> Want to join us? Come to one of our events.
        </p>
      </Reveal>

      <div className="flex justify-center">
        <Image
          src="/utesca-mascot-team.png"
          alt="UTESCA mascot in front of the CN Tower"
          width={629}
          height={950}
          className="h-auto w-auto max-h-[28rem] object-contain"
          priority
        />
      </div>

      {/* overflow-x: clip guards against page-turn transforms widening the page */}
      {/* -mx/px widen the clip box so mobile notebooks can use the side padding */}
      <div className="-mx-5 px-5 md:mx-0 md:px-0 space-y-20 md:space-y-28 [overflow-x:clip]">
        {TEAM_NOTEBOOKS.map((team, i) => (
          <section
            key={team.id}
            id={team.id}
            aria-labelledby={`${team.id}-heading`}
            className="scroll-mt-24"
          >
            <Reveal>
              <h2
                id={`${team.id}-heading`}
                className="text-3xl md:text-4xl font-bold text-primary mb-8 text-center text-balance"
              >
                {team.name}
              </h2>
            </Reveal>
            <TeamNotebook team={team} preloadCover={i === 0} />
          </section>
        ))}
      </div>
    </div>
  );
};

export default MeetTheTeam;
