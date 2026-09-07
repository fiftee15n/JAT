"use client";
// beui.dev/components/motion/tooltip

import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import {
  cloneElement,
  isValidElement,
  type PointerEvent,
  type ReactElement,
  type ReactNode,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { EASE_OUT } from "@/lib/ease";
import { useDismiss } from "@/lib/hooks/use-dismiss";
import { useHoverGesture } from "@/lib/hooks/use-hover-gesture";
import { useTapGesture } from "@/lib/hooks/use-tap-gesture";
import { cn } from "@/lib/utils";

type Side = "top" | "right" | "bottom" | "left";

export type TooltipAlign = "start" | "center" | "end" | "auto";

export interface TooltipProps {
  content: ReactNode;
  children: ReactElement;
  side?: Side;
  align?: TooltipAlign;
  /** Delay before showing (ms). Default 120. */
  delay?: number;
  className?: string;
  /** Classes for the outer wrapper span. Use to fix baseline / fill parent. */
  wrapperClassName?: string;
  /** Whether to disable tooltip on touch devices. Default true. */
  disableOnTouch?: boolean;
}

// Gap between trigger and tooltip, in px.
const GAP = 8;

// Offset is in the direction *away* from the trigger — content originates near
// the trigger and rises into resting position.
const offsetFrom: Record<Side, { x?: number; y?: number }> = {
  top: { y: 8 },
  bottom: { y: -8 },
  left: { x: 8 },
  right: { x: -8 },
};

function buildVariants(side: Side): Variants {
  const o = offsetFrom[side];
  return {
    initial: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(5px)",
      x: o.x ?? 0,
      y: o.y ?? 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 380,
        damping: 30,
        mass: 0.7,
        opacity: { duration: 0.14, ease: EASE_OUT },
        filter: { duration: 0.18, ease: EASE_OUT },
      },
    },
    exit: {
      opacity: 0,
      scale: 0.94,
      filter: "blur(3px)",
      x: (o.x ?? 0) * 0.6,
      y: (o.y ?? 0) * 0.6,
      transition: { duration: 0.12, ease: EASE_OUT },
    },
  };
}

const REDUCED_VARIANTS: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.14, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.1, ease: EASE_OUT } },
};

// Once any tooltip has just closed, neighbouring tooltips open without the
// initial delay — moving along a toolbar feels instant after the first one.
const WARM_WINDOW_MS = 300;
let lastHiddenAt = 0;

export function Tooltip({
  content,
  children,
  side = "top",
  align = "auto",
  delay = 120,
  disableOnTouch = true,
  className,
  wrapperClassName,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<{
    top: number;
    left: number;
    transform: string;
    origin: string;
  } | null>(null);
  const id = useId();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const anchorRef = useRef<HTMLSpanElement>(null);
  const hover = useHoverGesture();
  const reduce = useReducedMotion();

  // Anchor point in viewport coords, with automatic boundary clamping and alignment
  const place = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const docW = typeof window !== "undefined" ? window.innerWidth : document.documentElement.clientWidth;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    let effectiveAlign = align;
    if (!effectiveAlign || effectiveAlign === "auto") {
      if (cx < 90) effectiveAlign = "start";
      else if (cx > docW - 90) effectiveAlign = "end";
      else effectiveAlign = "center";
    }

    let top = 0;
    let left = 0;
    let transform = "";
    let origin = "";

    if (side === "top" || side === "bottom") {
      top = side === "top" ? r.top - GAP : r.bottom + GAP;
      if (effectiveAlign === "start") {
        left = Math.max(12, r.left);
        transform = side === "top" ? "translate(0, -100%)" : "translate(0, 0)";
        origin = side === "top" ? "left bottom" : "left top";
      } else if (effectiveAlign === "end") {
        left = Math.min(docW - 12, r.right);
        transform = side === "top" ? "translate(-100%, -100%)" : "translate(-100%, 0)";
        origin = side === "top" ? "right bottom" : "right top";
      } else {
        left = Math.max(12, Math.min(cx, docW - 12));
        transform = side === "top" ? "translate(-50%, -100%)" : "translate(-50%, 0)";
        origin = side === "top" ? "center bottom" : "center top";
      }
    } else {
      top = cy;
      left = side === "left" ? r.left - GAP : r.right + GAP;
      transform = side === "left" ? "translate(-100%, -50%)" : "translate(0, -50%)";
      origin = side === "left" ? "right center" : "left center";
    }

    setPlacement({ top, left, transform, origin });
  }, [side, align]);

  const show = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    const warm = Date.now() - lastHiddenAt < WARM_WINDOW_MS;
    timer.current = setTimeout(
      () => {
        place();
        setOpen(true);
      },
      warm ? 0 : delay,
    );
  }, [delay, place]);

  const hide = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    if (open) lastHiddenAt = Date.now();
    setOpen(false);
  }, [open]);

  const tap = useTapGesture<boolean>();

  const toggleOnTap = useCallback(() => {
    const gesture = tap.take();
    if (!gesture || gesture.pointerType === "touch" || gesture.pointerType === "pen" || disableOnTouch) {
      return;
    }
    if (gesture.state) {
      hide();
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    place();
    setOpen(true);
  }, [disableOnTouch, hide, place, tap]);

  useDismiss(open, hide, anchorRef);

  useEffect(() => {
    if (!open) return;
    const onMove = () => place();
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
    };
  }, [open, place]);

  const variants = useMemo(
    () => (reduce ? REDUCED_VARIANTS : buildVariants(side)),
    [reduce, side],
  );

  if (!isValidElement(children)) return children;

  const trigger = cloneElement(children as ReactElement<Record<string, unknown>>, {
    "aria-describedby": id,
  });

  return (
    <>
      <span
        ref={anchorRef}
        className={cn("relative inline-flex align-middle", wrapperClassName)}
        onPointerEnter={(event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          if (hover.enter(event)) show();
        }}
        onPointerLeave={(event: PointerEvent) => {
          if (hover.leave(event)) hide();
        }}
        onFocus={show}
        onBlur={hide}
        onPointerDown={(event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          tap.start(event, open);
        }}
        onPointerCancel={tap.drop}
        onKeyDown={tap.drop}
        onClick={toggleOnTap}
      >
        {trigger}
      </span>
      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open && placement ? (
                <span
                  aria-hidden
                  className="pointer-events-none fixed z-[9999]"
                  style={{
                    top: placement.top,
                    left: placement.left,
                    transform: placement.transform,
                  }}
                >
                  <motion.span
                    id={id}
                    role="tooltip"
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    style={{ transformOrigin: placement.origin }}
                    className={cn(
                      "block whitespace-nowrap rounded-full bg-foreground px-2.5 py-1 text-xs font-medium text-background shadow-lg",
                      className,
                    )}
                  >
                    {content}
                  </motion.span>
                </span>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </>
  );
}
