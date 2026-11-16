import { cn } from "@/lib/utils";
import type { TeamNotebookConfig } from "../notebook/teams";
import { Tape } from "./Doodles";
import { handwriting } from "./fonts";
import styles from "./Scrapbook.module.css";

/** Taped index card listing every team, linking to its notebook. */
export default function YearbookIndex({
  teams,
}: {
  teams: TeamNotebookConfig[];
}) {
  return (
    <nav
      aria-label="Teams"
      className={cn(
        styles.indexCard,
        "mx-auto w-full max-w-sm rotate-[1.5deg] rounded-sm px-6 pb-6 pt-2",
      )}
    >
      <Tape className="-top-3 left-1/2 -translate-x-1/2 -rotate-3" tone="rose" />
      <p
        className={cn(
          handwriting.className,
          "h-[2.6rem] pt-1 text-3xl font-bold leading-[2.4rem] text-primary",
        )}
      >
        Contents
      </p>
      <ol className="mt-[0.65rem]">
        {teams.map((team, i) => (
          <li key={team.id}>
            <a
              href={`#${team.id}`}
              className="group flex h-[2.1rem] items-end gap-3 pb-[0.3rem] text-sm font-medium text-foreground/80 outline-none transition-colors hover:text-primary focus-visible:text-primary focus-visible:underline"
            >
              <span className="w-6 font-semibold tabular-nums text-primary/70">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 truncate">{team.name}</span>
              <span
                aria-hidden
                className="text-primary/40 transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
