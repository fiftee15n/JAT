"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";

const CARD_W = 200; // default card width — override per badge with the `width` prop

// TEMP: hover popup disabled for review — flip to true to re-enable
const POPUP_ENABLED = true;

export function LogoBadge({
  id,
  label,
  src,
  href,
  videoSrc,
  imageSrc,
  iframeSrc,
  autoScrollWeb,
  width,
  popup = true,
  active,
  dimmed,
  onHoverChange,
  className = "",
  imgClassName = "",
  children,
}: {
  id: string;
  label: string;
  src: string;
  href: string;
  videoSrc?: string;
  imageSrc?: string;
  iframeSrc?: string;
  autoScrollWeb?: boolean;
  width?: number;
  popup?: boolean;
  active: boolean;
  dimmed: boolean;
  onHoverChange: (id: string | null) => void;
  className?: string;
  imgClassName?: string;
  children: React.ReactNode;
}) {
  const cardW = width ?? CARD_W;
  const cardHalf = cardW / 2;
  const wrapperRef = useRef<HTMLAnchorElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  // popup lives in a body portal (a <div> may not nest inside the bio <p>);
  // pos is viewport coords — y anchors 12px above the badge, card is translateY(-100%)
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => setMounted(true), []);

  // start playback only once the open animation (longest: 240ms filter) has finished
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoSrc) return;
    if (!active) {
      v.pause();
      v.currentTime = 0;
      return;
    }
    const t = setTimeout(() => v.play().catch(() => {}), 240);
    return () => clearTimeout(t);
  }, [active, videoSrc]);

  const getPos = (e: React.MouseEvent) => {
    const r = wrapperRef.current?.getBoundingClientRect();
    if (!r) return;
    const clamped = Math.min(Math.max(e.clientX, cardHalf + 12), document.documentElement.clientWidth - cardHalf - 12);
    setPos({ x: clamped - cardHalf, y: r.top - 12 });
  };

  // keep the fixed popup glued to the badge while scrolling/resizing with it open
  useEffect(() => {
    if (!active) return;
    const reanchor = () => {
      const r = wrapperRef.current?.getBoundingClientRect();
      if (r) setPos((p) => ({ ...p, y: r.top - 12 }));
    };
    window.addEventListener("scroll", reanchor, { passive: true });
    window.addEventListener("resize", reanchor);
    return () => {
      window.removeEventListener("scroll", reanchor);
      window.removeEventListener("resize", reanchor);
    };
  }, [active]);

  const hasAutoScroll = autoScrollWeb || Boolean(iframeSrc);
  const targetHost = (() => {
    try {
      return new URL(href || iframeSrc || "https://donoroapp.com").hostname;
    } catch {
      return "donoroapp.com";
    }
  })();

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        ref={wrapperRef}
        className={`relative cursor-pointer transition-[filter] duration-300 ${dimmed ? "blur-[8px]" : ""} ${className}`}
        onMouseEnter={(e) => { if (!popup) return; getPos(e); onHoverChange(id); }}
        onMouseMove={getPos}
        onMouseLeave={() => { if (!popup) return; onHoverChange(null); }}
      >
        {children}
      </a>
      {mounted &&
        createPortal(
          <div
            className="pointer-events-none fixed left-0 z-20"
            style={{ top: pos.y, transform: "translateY(-100%)" }}
          >
            <AnimatePresence>
              {POPUP_ENABLED && popup && active && (
                <motion.div
                  initial={{ opacity: 0, y: 16, filter: "blur(12px)", x: pos.x }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", x: pos.x }}
                  exit={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                  transition={{
                    opacity: { duration: 0.2, ease: "easeOut" },
                    y: { duration: 0.2, ease: "easeOut" },
                    filter: { duration: 0.24, ease: "easeOut" },
                    x: { type: "tween", duration: 0.16, ease: "easeOut" },
                  }}
                  style={{ width: cardW }}
                >
                  <div className={`w-full overflow-hidden rounded-[8px] bg-white shadow-[0px_53px_79px_rgba(0,0,0,0.28)] dark:bg-zinc-900 border border-neutral-200/80 dark:border-neutral-800 ${hasAutoScroll || videoSrc || imageSrc ? "" : "h-[118px]"}`}>
                    {hasAutoScroll ? (
                      <div className="flex w-full flex-col overflow-hidden bg-neutral-950">
                        {/* Mini browser top bar */}
                        <div className="flex h-[24px] w-full items-center justify-between border-b border-neutral-200/70 dark:border-neutral-800 bg-neutral-100/95 dark:bg-neutral-900/95 px-2.5">
                          <div className="flex items-center gap-1">
                            <span className="size-[6px] rounded-full bg-[#ff5f56]" />
                            <span className="size-[6px] rounded-full bg-[#ffbd2e]" />
                            <span className="size-[6px] rounded-full bg-[#27c93f]" />
                          </div>
                          <div className="flex items-center gap-1 rounded bg-white/80 dark:bg-neutral-800/80 px-2 py-0.5 text-[9px] font-mono text-neutral-600 dark:text-neutral-300">
                            <span className="size-[4px] rounded-full bg-emerald-500 animate-pulse" />
                            <span className="truncate max-w-[130px]">{targetHost}</span>
                          </div>
                          <div className="size-[10px] text-neutral-400">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-full">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15 3 21 3 21 9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                          </div>
                        </div>

                        {/* Viewport with auto-scrolling live web preview */}
                        <div className="relative h-[168px] w-full overflow-hidden bg-white dark:bg-neutral-900">
                          {/* Fallback base preview */}
                          {imageSrc && (
                            <img
                              src={imageSrc}
                              alt={label}
                              className="absolute inset-0 size-full object-cover opacity-80"
                            />
                          )}

                          {/* Scaled scrolling live iframe container */}
                          <motion.div
                            className="absolute left-0 top-0 w-[800px] h-[2800px] origin-top-left pointer-events-none select-none"
                            style={{ transform: `scale(${cardW / 800})` }}
                            animate={active ? { y: [0, -1950, 0] } : { y: 0 }}
                            transition={{
                              y: {
                                duration: 12,
                                ease: "easeInOut",
                                repeat: Infinity,
                                repeatDelay: 0.6,
                              },
                            }}
                          >
                            <iframe
                              src={iframeSrc || href}
                              title={label}
                              loading="lazy"
                              className="size-full border-0 bg-white"
                              sandbox="allow-scripts allow-same-origin"
                              tabIndex={-1}
                            />
                          </motion.div>

                          {/* Bottom gradient fade */}
                          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent" />
                        </div>
                      </div>
                    ) : videoSrc ? (
                      <video ref={videoRef} src={videoSrc} loop muted playsInline draggable={false} className="block w-full" />
                    ) : imageSrc ? (
                      <img src={imageSrc} alt={label} draggable={false} className="block w-full h-[160px] object-cover" />
                    ) : (
                      <div className="flex h-[118px] w-full items-center justify-center p-4">
                        <img src={src} alt={label} draggable={false} className={`max-h-[60px] max-w-[140px] object-contain ${imgClassName}`} />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>,
          document.body
        )}
    </>
  );
}

