"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { EASE_OUT } from "@/lib/ease";

const HELLOS = [
  "Hello",
  "Bonjour",
  "স্বাগতম",
  "Hola",
  "Ciao",
  "नमस्ते",
  "你好",
  "こんにちは",
];

const LOGO_ASPECT = 502 / 688;
const START_H = 110;
const START_W = Math.round(START_H * LOGO_ASPECT);

type Phase = "words" | "signature" | "moving";

export function WelcomeLoader({ onComplete }: { onComplete: () => void }) {
  const reduce = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("words");
  const [path, setPath] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    endScale: number;
  } | null>(null);

  useEffect(() => {
    const el = document.getElementById("hero-signature");
    const r = el?.getBoundingClientRect();
    const targetH = r && r.height > 0 ? r.height : 76;
    setPath({
      startX: (window.innerWidth - START_W) / 2,
      startY: (window.innerHeight - START_H) / 2,
      endX: r ? r.left : Math.max(24, window.innerWidth / 2 - 270),
      endY: r ? r.top : 64,
      endScale: targetH / START_H,
    });
  }, []);

  useEffect(() => {
    if (reduce) {
      const t = setTimeout(() => setPhase("signature"), 180);
      return () => clearTimeout(t);
    }
    const id = setInterval(() => {
      setIndex((i) => {
        if (i >= HELLOS.length - 2) {
          clearInterval(id);
          setTimeout(() => setPhase("signature"), 320);
          return HELLOS.length - 1;
        }
        return i + 1;
      });
    }, 240);
    return () => clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (phase !== "signature") return;
    const t = setTimeout(() => setPhase("moving"), 500);
    return () => clearTimeout(t);
  }, [phase]);

  const handleAnimationComplete = () => {
    if (phase === "moving") {
      onComplete();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-background"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      aria-modal="true"
      role="dialog"
      aria-label="Welcome"
    >
      {phase === "words" || !path ? (
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="flex h-[32px] w-full items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`word-${HELLOS[index]}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.12, ease: "easeInOut" }}
                className="flex items-center justify-center gap-3"
              >
                <span
                  aria-hidden="true"
                  className="size-[5px] shrink-0 rounded-full bg-foreground"
                />
                <span className="whitespace-nowrap text-[20px] font-medium leading-[1.2] tracking-tight text-foreground md:text-[24px]">
                  {HELLOS[index]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <motion.div
          key="logo-flight"
          className="pointer-events-none select-none"
          initial={{
            opacity: 0,
            filter: "blur(6px)",
            x: path.startX,
            y: path.startY,
            scale: 1,
          }}
          animate={
            phase === "moving"
              ? {
                  opacity: 1,
                  filter: "blur(0px)",
                  x: path.endX,
                  y: path.endY,
                  scale: path.endScale,
                  transition: { duration: 0.7, ease: EASE_OUT },
                }
              : {
                  opacity: 1,
                  filter: "blur(0px)",
                  x: path.startX,
                  y: path.startY,
                  scale: 1,
                  transition: {
                    duration: 0.45,
                    ease: "easeOut",
                    filter: { duration: 0.5, ease: "easeOut" },
                  },
                }
          }
          onAnimationComplete={handleAnimationComplete}
          style={
            {
              position: "fixed",
              top: 0,
              left: 0,
              height: `${START_H}px`,
              width: `${START_W}px`,
              transformOrigin: "top left",
              willChange: "transform, opacity",
            } as const
          }
        >
          <img
            src="/logo.png"
            alt="Logo"
            draggable={false}
            className="h-full w-full object-contain dark:invert"
          />
        </motion.div>
      )}
    </motion.div>
  );
}
