"use client";

import * as React from "react";
import { ExternalLink, RotateCw } from "lucide-react";
import Image from "next/image";

interface ProjectProps {
  title: string;
  category: string;
  description: string;
  img?: string;
  link?: string;
}

export default function ProjectComponent({
  title,
  category,
  description,
  img,
  link = "",
}: ProjectProps) {
  return (
        <div className="w-full">
      <div className="group [perspective:1200px]">
        <div
          tabIndex={0}
          className="relative h-[18rem] w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]"
        >
          {/* Front */}
          <div className="absolute inset-0 overflow-hidden rounded-lg bg-secondary shadow-sm transition-shadow duration-300 hover:shadow-xl [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
            {img && (
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover select-none"
                draggable={false}
              />
            )}
            <span className="absolute right-2 top-2 rounded-full bg-background/80 p-1">
              <RotateCw className="size-4" />
            </span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex flex-col gap-3 overflow-y-auto rounded-lg bg-primary/10 p-6 text-primary-foreground [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-black text-lg">{description}</p>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1 text-sm text-primary"
              >
                Visit <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-4 flex min-h-12 w-full flex-col items-center text-center">
        <h3 className="font-normal">{title}</h3>
        <span className="text-muted-foreground italic text-right">
          {category}
        </span>
      </div>
    </div>
  );
}
