import React from "react";
import Team from "./Team";

/**
 * VisionAndMission component displays the vision and mission statement.
 */
const MeetTheTeam: React.FC = () => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-primary text-balance">
          Meet the Executive Team
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground text-balance">
          These are the people that make up the UTESCA team.
          <br /> Want to join us? Come to one of our events.
        </p>
      </div>
      <Team />
    </div>
  );
};

export default MeetTheTeam;
