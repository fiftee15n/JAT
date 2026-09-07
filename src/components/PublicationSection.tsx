"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { SPRING_LAYOUT } from "@/lib/ease";
import { content } from "@/lib/content";

const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

export function PublicationSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="w-full" onMouseLeave={() => setHovered(null)}>
      <div className="flex items-center justify-between">
        <h2 className="text-[13px] leading-[19.5px] text-neutral-500 dark:text-neutral-400">
          Research & Publications
        </h2>
        <span className="font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
          Peer-Reviewed
        </span>
      </div>

      <div
        className={`mt-[14px] border-t border-dashed transition-colors duration-500 ${EASE} ${
          hovered === content.publications[0]?.title ? "border-transparent" : "border-neutral-200 dark:border-neutral-800"
        }`}
      >
        {content.publications.map((paper) => {
          const isHovered = hovered === paper.title;
          return (
            <div
              key={paper.title}
              onMouseEnter={() => setHovered(paper.title)}
              className={`group relative border-b border-dashed py-[11px] px-[10.5px] transition-colors duration-500 ${EASE} ${
                isHovered ? "border-transparent" : "border-neutral-200 dark:border-neutral-800"
              }`}
            >
              <AnimatePresence>
                {isHovered && (
                  <motion.span
                    layoutId="publication-hover-pill"
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.25 } }}
                    transition={reduce ? { duration: 0 } : SPRING_LAYOUT}
                    className="absolute inset-0 -z-10 rounded-lg bg-neutral-200/70 dark:bg-neutral-800/60"
                  />
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-1.5">
                {/* Meta row: Year, Conference, Role, Read Link */}
                <div className="flex flex-wrap items-center justify-between gap-y-1.5 gap-x-2">
                  <div className="flex flex-wrap items-center gap-2 text-[12px] leading-none">
                    <span className="font-mono text-neutral-500 dark:text-neutral-400">
                      {paper.year}
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-700">•</span>
                    <span className="rounded-full bg-neutral-100 px-2 py-0.5 font-mono text-[11px] font-medium text-neutral-700 dark:bg-neutral-900 dark:text-neutral-300">
                      {paper.conference}
                    </span>
                    <span className="text-neutral-300 dark:text-neutral-700">•</span>
                    <span className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400">
                      {paper.role}
                    </span>
                  </div>

                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center gap-1 font-mono text-[11.5px] text-neutral-500 transition-colors hover:text-black dark:text-neutral-400 dark:hover:text-white"
                  >
                    <span>Read Paper</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-[11px] opacity-70 transition-transform group-hover:translate-x-[1px] group-hover:-translate-y-[1px]"
                    >
                      <path d="M7 7h10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7 17 17 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

                {/* Title */}
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] font-medium leading-[20px] text-black transition-colors hover:text-neutral-700 dark:text-white dark:hover:text-neutral-200"
                >
                  {paper.title}
                </a>

                {/* DOI & Details line */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11.5px] text-neutral-500 dark:text-neutral-400">
                  <span className="flex min-w-0 flex-wrap items-center gap-1">
                    <span className="text-neutral-400 dark:text-neutral-500">DOI:</span>
                    <a
                      href={`https://doi.org/${paper.doi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-neutral-600 underline decoration-neutral-300 underline-offset-2 hover:text-black dark:text-neutral-300 dark:decoration-neutral-700 dark:hover:text-white"
                    >
                      {paper.doi}
                    </a>
                  </span>
                  <span className="text-neutral-300 dark:text-neutral-700">•</span>
                  <span>{paper.publisher}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
