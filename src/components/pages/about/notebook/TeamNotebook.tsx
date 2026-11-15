"use client";

import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type AnimationEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  PAGE_HEIGHT,
  PAGE_WIDTH,
  type NotebookPage,
  type TeamNotebookConfig,
} from "./teams";
import styles from "./TeamNotebook.module.css";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** A view of the notebook: page indices shown on the left/right (or alone). */
interface Spread {
  left: number | null;
  right: number | null;
}

/**
 * Desktop: the cover sits alone on the right, then pages pair up (2–3, 4–5…).
 * A trailing unpaired page sits alone on the left.
 * Mobile: one page per view (stored in `right`).
 */
function buildSpreads(count: number, twoUp: boolean): Spread[] {
  if (!twoUp) {
    return Array.from({ length: count }, (_, i) => ({ left: null, right: i }));
  }
  const spreads: Spread[] = [{ left: null, right: 0 }];
  for (let i = 1; i < count; i += 2) {
    spreads.push({ left: i, right: i + 1 < count ? i + 1 : null });
  }
  return spreads;
}

const firstPageOf = (s: Spread) => (s.left ?? s.right) as number;
const pagesOf = (s: Spread) =>
  [s.left, s.right].filter((p): p is number => p !== null);

function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

const SWIPE_THRESHOLD_PX = 40;

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

interface TeamNotebookProps {
  team: TeamNotebookConfig;
  /** Preload the opening pages (use for the first notebook on the page). */
  preloadCover?: boolean;
}

interface Flip {
  dir: "next" | "prev";
  from: number;
  to: number;
  /** Layout the flip was started in; a flip from another layout is ignored. */
  twoUp: boolean;
}

export default function TeamNotebook({
  team,
  preloadCover = false,
}: TeamNotebookProps) {
  const { pages, name } = team;
  const twoUp = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  const spreads = useMemo(
    () => buildSpreads(pages.length, twoUp),
    [pages.length, twoUp],
  );

  // Track the first visible page (not the spread index) so position survives
  // switching between the mobile and desktop layouts.
  const [page, setPage] = useState(0);
  const [flip, setFlip] = useState<Flip | null>(null);
  const [fullSizeOpen, setFullSizeOpen] = useState(false);

  const current = Math.max(
    0,
    spreads.findIndex((s) => pagesOf(s).includes(page)),
  );
  const activeFlip = flip && flip.twoUp === twoUp ? flip : null;
  const hasPrev = current > 0;
  const hasNext = current < spreads.length - 1;

  const pageSizes = twoUp
    ? "(min-width: 1280px) 608px, 50vw"
    : "(min-width: 512px) 512px, 100vw";

  const goTo = useCallback(
    (dir: "next" | "prev") => {
      if (activeFlip) return; // let the current turn finish
      const to = dir === "next" ? current + 1 : current - 1;
      if (to < 0 || to >= spreads.length) return;
      if (reducedMotion) {
        setPage(firstPageOf(spreads[to]));
        return;
      }
      setFlip({ dir, from: current, to, twoUp });
    },
    [activeFlip, current, reducedMotion, spreads, twoUp],
  );

  const finishFlip = (e: AnimationEvent<HTMLDivElement>) => {
    // Ignore animationend events bubbling up from the shade overlays.
    if (e.target !== e.currentTarget || !activeFlip) return;
    setPage(firstPageOf(spreads[activeFlip.to]));
    setFlip(null);
  };

  /* ---------- Pointer: tap to flip, horizontal swipe ---------- */

  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const suppressClick = useRef(false);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = { x: e.clientX, y: e.clientY };
    suppressClick.current = false;
  };

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_THRESHOLD_PX && Math.abs(dx) > Math.abs(dy)) {
      suppressClick.current = true;
      goTo(dx < 0 ? "next" : "prev");
    }
  };

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if (suppressClick.current) {
      suppressClick.current = false;
      return;
    }
    if (!hasPrev) return goTo("next");
    if (!hasNext) return goTo("prev");
    const rect = e.currentTarget.getBoundingClientRect();
    goTo(e.clientX - rect.left < rect.width / 2 ? "prev" : "next");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo("next");
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo("prev");
    }
  };

  /* ---------- What to draw ---------- */

  const spread = spreads[current];
  const from = activeFlip ? spreads[activeFlip.from] : spread;
  const to = activeFlip ? spreads[activeFlip.to] : spread;

  // Pages lying flat underneath the turning leaf.
  let under: Spread = spread;
  if (activeFlip && twoUp) {
    under =
      activeFlip.dir === "next"
        ? { left: from.left, right: to.right }
        : { left: to.left, right: from.right };
  } else if (activeFlip) {
    under = activeFlip.dir === "next" ? to : from;
  }

  // Centre the book when only one side has a page (closed cover / last page).
  const target = activeFlip ? to : spread;
  const shift =
    twoUp && target.left === null
      ? "-25%"
      : twoUp && target.right === null
        ? "25%"
        : "0%";
  // Ground shadow spans only the halves that hold a page.
  const ground = twoUp
    ? {
        left: target.left === null ? "53%" : "3%",
        right: target.right === null ? "53%" : "3%",
      }
    : { left: "5%", right: "5%" };

  // Neighbouring pages are fetched ahead of time so turns don't flash.
  const preloadPages = [spreads[current - 1], spreads[current + 1]]
    .filter(Boolean)
    .flatMap((s) => pagesOf(s as Spread))
    .filter((p) => !pagesOf(spread).includes(p));

  const visible = pagesOf(spread);
  const indicator =
    visible.length === 2
      ? `Pages ${visible[0] + 1}–${visible[1] + 1} of ${pages.length}`
      : `Page ${visible[0] + 1} of ${pages.length}`;

  const renderPage = (index: number, eager = false) => (
    <Image
      src={pages[index].src}
      alt={pages[index].alt}
      fill
      sizes={pageSizes}
      preload={preloadCover && eager}
      draggable={false}
      className="object-contain"
    />
  );

  const instructionsId = useId();

  return (
    <div className="flex flex-col items-center gap-9">
      <div
        role="group"
        aria-roledescription="notebook"
        aria-label={`${name} notebook`}
        aria-describedby={instructionsId}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointerStart.current = null)}
        onClick={onClick}
        className={cn(styles.stage, twoUp ? styles.twoUp : styles.single)}
      >
        <span id={instructionsId} className="sr-only">
          Use the left and right arrow keys, or the previous and next buttons,
          to turn pages.
        </span>

        <div
          key={reducedMotion ? current : undefined}
          className={cn(styles.book, reducedMotion && styles.fadeIn)}
          style={{ transform: `translateX(${shift})` }}
        >
          <div className={styles.groundShadow} style={ground} aria-hidden />
          {twoUp ? (
            <>
              {under.left !== null && (
                <div className={cn(styles.slot, styles.slotLeft, styles.paperShadow)}>
                  {renderPage(under.left)}
                </div>
              )}
              {under.right !== null && (
                <div className={cn(styles.slot, styles.slotRight, styles.paperShadow)}>
                  {renderPage(under.right, under.right === 0)}
                </div>
              )}
              {(under.left !== null || activeFlip) &&
                (under.right !== null || activeFlip) && (
                  <div className={styles.spine} aria-hidden />
                )}
            </>
          ) : (
            under.right !== null && (
              <div className={cn(styles.slot, styles.slotFull, styles.paperShadow)}>
                {renderPage(under.right, under.right === 0)}
              </div>
            )
          )}

          {activeFlip && (
            <Leaf
              flip={activeFlip}
              twoUp={twoUp}
              from={from}
              to={to}
              renderPage={renderPage}
              onAnimationEnd={finishFlip}
            />
          )}
        </div>

        <div className={styles.preload} aria-hidden>
          {preloadPages.map((p) => (
            <Image
              key={p}
              src={pages[p].src}
              alt=""
              fill
              sizes={pageSizes}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => goTo("prev")}
          disabled={!hasPrev}
          aria-label={`Previous page, ${name}`}
          className="rounded-full"
        >
          <ChevronLeft aria-hidden />
        </Button>
        <p
          className="min-w-[9.5rem] text-center text-sm font-medium tabular-nums text-muted-foreground"
          aria-live="polite"
        >
          {indicator}
        </p>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => goTo("next")}
          disabled={!hasNext}
          aria-label={`Next page, ${name}`}
          className="rounded-full"
        >
          <ChevronRight aria-hidden />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setFullSizeOpen(true)}
          className="text-muted-foreground"
        >
          <Maximize2 aria-hidden />
          View full size
        </Button>
      </div>

      <FullSizeDialog
        open={fullSizeOpen}
        onOpenChange={setFullSizeOpen}
        title={`${name} notebook, ${indicator.toLowerCase()}`}
        pages={visible.map((i) => pages[i])}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Turning leaf                                                        */
/* ------------------------------------------------------------------ */

function Leaf({
  flip,
  twoUp,
  from,
  to,
  renderPage,
  onAnimationEnd,
}: {
  flip: Flip;
  twoUp: boolean;
  from: Spread;
  to: Spread;
  renderPage: (index: number) => ReactNode;
  onAnimationEnd: (e: AnimationEvent<HTMLDivElement>) => void;
}) {
  if (!twoUp) {
    // Single page: the current page swings away (next) or the previous page
    // swings back in (prev).
    const pageIndex = flip.dir === "next" ? from.right : to.right;
    return (
      <div
        className={cn(styles.leaf, flip.dir === "next" ? styles.leafOut : styles.leafIn)}
        onAnimationEnd={onAnimationEnd}
        aria-hidden
      >
        <div className={cn(styles.face, styles.front)}>
          {pageIndex !== null && renderPage(pageIndex)}
          <div className={styles.shade} />
        </div>
      </div>
    );
  }

  // Two-up: a two-sided leaf rotating about the spine.
  const front = flip.dir === "next" ? from.right : from.left;
  const back = flip.dir === "next" ? to.left : to.right;
  return (
    <div
      className={cn(styles.leaf, flip.dir === "next" ? styles.leafNext : styles.leafPrev)}
      onAnimationEnd={onAnimationEnd}
      aria-hidden
    >
      <div className={cn(styles.face, styles.front)}>
        {front !== null && renderPage(front)}
        <div className={styles.shade} />
      </div>
      <div className={cn(styles.face, styles.back)}>
        {back !== null && renderPage(back)}
        <div className={styles.shade} />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Full-size viewer                                                    */
/* ------------------------------------------------------------------ */

function FullSizeDialog({
  open,
  onOpenChange,
  title,
  pages,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  pages: NotebookPage[];
}) {
  const [zoomed, setZoomed] = useState(false);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (!next) setZoomed(false);
        onOpenChange(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-neutral-950 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col focus:outline-none"
          aria-describedby={undefined}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
            <Dialog.Title className="text-sm font-medium md:text-base">
              {title}
            </Dialog.Title>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setZoomed((z) => !z)}
                aria-pressed={zoomed}
                className="text-white hover:bg-white/10 hover:text-white"
              >
                {zoomed ? "Fit to screen" : "Actual size"}
              </Button>
              <Dialog.Close asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label="Close full size view"
                  className="text-white hover:bg-white/10 hover:text-white"
                >
                  <X aria-hidden />
                </Button>
              </Dialog.Close>
            </div>
          </div>

          <div className="flex-1 overflow-auto px-4 pb-4">
            <div
              className={cn(
                "flex min-h-full gap-4",
                zoomed
                  ? "w-max flex-col items-start md:flex-row"
                  : "flex-col items-center justify-center md:flex-row",
              )}
            >
              {pages.map((p) => (
                <Image
                  key={p.src}
                  src={p.src}
                  alt={p.alt}
                  width={PAGE_WIDTH}
                  height={PAGE_HEIGHT}
                  sizes={zoomed ? `${PAGE_WIDTH}px` : "(min-width: 768px) 50vw, 100vw"}
                  onClick={() => setZoomed((z) => !z)}
                  className={cn(
                    "rounded-md",
                    zoomed
                      ? "w-[1080px] max-w-none cursor-zoom-out"
                      : "h-auto max-h-[calc(100svh-6rem)] w-auto max-w-full cursor-zoom-in object-contain md:max-w-[calc(50%-0.5rem)]",
                  )}
                />
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
