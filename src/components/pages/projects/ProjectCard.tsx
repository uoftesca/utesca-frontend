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
  isFlipped: boolean;
  onToggle: () => void;
}

export default function ProjectComponent({
  title,
  category,
  description,
  img,
  isFlipped,
  onToggle,
  link = "",
}: ProjectProps) {
  return (
    <div className="w-full">
      <div className="[perspective:1200px]">
        <div
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle();
            }
          }}
          className={`relative h-[18rem] w-full cursor-pointer transition-transform duration-500 [transform-style:preserve-3d] ${
            isFlipped ? "[transform:rotateY(180deg)]" : ""
          }`}
        >
          {/* Front */}
          <div className="absolute inset-0 overflow-hidden rounded-lg bg-secondary [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
            {img && (
              <Image
                src={img}
                alt={title}
                fill
                className="object-cover select-none"
                draggable={false}
              />
            )}
            <span className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5 text-muted-foreground">
              <RotateCw className="size-4" />
            </span>
          </div>

          {/* Back */}
          <div className="absolute inset-0 flex flex-col gap-3 overflow-y-auto rounded-lg bg-muted p-6 text-primary-foreground [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
            <p className="text-black text-sm">{description}</p>
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-auto inline-flex items-center gap-1 text-sm text-primary-foreground hover:text-primary-foreground/70"
              >
                Visit <ExternalLink className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-4 flex h-12 w-full items-start justify-between">
        <h3 className="font-normal">{title}</h3>
        <span className="text-muted-foreground italic text-right">
          {category}
        </span>
      </div>
    </div>
  );
}
