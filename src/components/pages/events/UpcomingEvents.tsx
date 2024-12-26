"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";

const UpcomingEvents: React.FC = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-bold tracking-normal md:text-4xl text-accent">
          Upcoming Events
        </h1>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border text-center p-4"
          classNames={{
            // // root: "w-[500px] h-[500px]", // Set the overall calendar size
            // // day: "w-16 h-16 flex items-center justify-center text-lg", // Larger day cells
            // // day: "w-20 h-20 text-xl flex items-center justify-center", // Make day cells larger (80x80px)
            // day: "rounded-md",
            day_selected: "rounded-md text-white", // Style for selected day
            day_today: "border-2 border-accent text-black", // Style for today's date
            // // caption: "text-2xl font-bold mb-4", // Larger month caption
            // // nav: "text-xl text-accent", // Larger navigation buttons
            // root: "w-[500px] h-[500px] space-y-4", // Adds spacing between sections
            // day: "w-20 h-20 text-xl flex items-center justify-center", // Make day cells larger (80x80px)
            // day_selected: "bg-blue-500 text-white", // Highlight for selected day
            // day_today: "border-2 border-accent text-black", // Style for today
            // caption: "text-3xl font-bold", // Larger month header
            // nav: "text-xl", // Larger navigation buttons
          }}
        />
      </div>
    </div>
  );
};

export default UpcomingEvents;
