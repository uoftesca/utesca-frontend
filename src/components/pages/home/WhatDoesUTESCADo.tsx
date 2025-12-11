import { GraduationCap, Handshake, Users } from 'lucide-react';

import OverviewCard from './OverviewCard';

const WhatDoesUTESCADo: React.FC = () => {
  return (
    <div className="w-full text-center max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold tracking-normal md:text-4xl text-primary">
        What does UTESCA do?
      </h1>
      <p className="text-base text-muted-foreground mx-auto">
        UTESCA is the premier engineering consulting club at UofT. We bridge
        engineering and consulting for students who are interested in pursuing a
        career in consulting.
      </p>
      <div className="flex flex-col items-center gap-6">
        <div className="max-w-fit grid justify-items-center grid-cols-1 md:grid-cols-2 gap-6">
          <OverviewCard
            Icon={Users}
            title="Networking"
            text="Are you passionate about consulting and its role in engineering? Interested in enhancing your leadership and networking skills? Looking to add to your team building and project management skills? Then UTESCA is the place for you!"
          />
          <OverviewCard
            Icon={Handshake}
            title="Community"
            text="Here at UTESCA we foster a community of passionate students looking to enter the engineering consulting field. We expose students to a large network of industry consultants and career-focused events to build our members’ personal and professional skills."
          />
        </div>
        <OverviewCard
          Icon={GraduationCap}
          title="Consulting Engineering Projects"
          text="UTESCA is driven by multiple teams, each playing a vital role in our programs and events. Our Corporate Relations team organizes events and manages relationships with partner companies. The Consulting Engineering Program (CEP) team oversees our annual pro-bono consulting projects. Meanwhile, our Operations, Finance, Web, and Marketing teams are the core of UTESCA, ensuring we deliver quality and professionalism while supporting engineering students in their journey to success."
          className="md:w-[calc(50%-12px)]"
        />
      </div>
    </div>
  );
};

export default WhatDoesUTESCADo;
