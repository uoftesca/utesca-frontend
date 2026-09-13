import { Calendar, CircleCheck, Clock, MapPin } from "lucide-react";

import Container from "@/components/Container";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import NavBar from "@/components/NavBar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// TODO(backend): replace with real data
const rsvp = {
  attendeeName: "John Doe",
  eventTitle: "UTESCA Info Night",
  date: "Tuesday, September 22nd, 2026",
  time: "6:00 PM EST",
  location: "Bahen Centre, Room 1170",
};

export default function EventConfirmationPage() {
  return (
    <>
      <NavBar />
      <main>
        <Hero />
        <Container>
          <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center space-y-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CircleCheck className="h-9 w-9" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-normal md:text-4xl text-primary">
                You're confirmed!
              </h1>
              <p className="text-muted-foreground">
                Thanks, {rsvp.attendeeName}. 
                <br />
                Your RSVP for{" "}
                <span className="font-semibold text-foreground">
                  {rsvp.eventTitle}
                </span>{" "}
                has been received. We'll see you there!
              </p>
            </div>

            <Card className="w-full border-none bg-card">
              <CardContent className="space-y-4 p-6 text-left">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold">{rsvp.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold">{rsvp.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{rsvp.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button asChild>
              <Link href="/events">Back to Events</Link>
            </Button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}