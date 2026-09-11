import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface PortfolioProps {
  readonly name: string;
  readonly role: string;
  readonly program: string;
  readonly imageUrl: string;
  readonly size?: "default" | "lg";
}

export function Portfolio({
  name,
  role,
  program,
  imageUrl,
  size,
}: PortfolioProps) {
  const isLg = size == "lg";
  return (
    <Card
      className={`bg-transparent border-none shadow-none transition duration-200 hover:-translate-y-1 ${
        isLg ? "w-60" : "w-44"
      }`}
    >
      <CardContent className="p-0 flex flex-col items-start">
        <Avatar
          className={`mb-2 rounded-full select-none ${
            isLg ? "w-60 h-60" : "w-44 h-44"
          }`}
        >
          <AvatarImage
            src={imageUrl}
            alt={name}
            width={500}
            height={500}
            className="object-cover pointer-events-none select-none"
            draggable={false}
          />
          <AvatarFallback className="rounded-lg">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="text-center w-full">
          <p
            className={`font-semibold text-muted-foreground font-heading ${
              isLg ? "text-xl" : "text-md"
            }`}
          >
            {name}
          </p>
          <p className="text-sm text-muted-foreground">{role}</p>
          <p className="text-sm text-muted-foreground">{program}</p>
        </div>
      </CardContent>
    </Card>
  );
}
