"use client";

import { content } from "@/lib/content";
import { motion, useReducedMotion } from "motion/react";

const FADE_UP = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export function EducationSection() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="testimonials" className="w-full max-w-[1080px] mx-auto">
      {/* Header text */}
      <div className="text-center">
        <motion.p
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate="visible"
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500"
        >
          ACADEMIC JOURNEY
        </motion.p>

        <motion.h2
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate="visible"
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.08 }}
          className="mt-2 text-[26px] font-bold tracking-tight text-neutral-900 dark:text-white sm:text-[32px]"
          style={{ fontFamily: "var(--font-overused-grotesk)" }}
        >
          Education &amp; Certifications
        </motion.h2>

        <motion.p
          variants={FADE_UP}
          initial={reduce ? false : "hidden"}
          animate="visible"
          transition={{ duration: 0.45, ease: "easeOut", delay: 0.14 }}
          className="mx-auto mt-2.5 max-w-[620px] text-[14px] leading-relaxed text-neutral-500 dark:text-neutral-400"
        >
          A comprehensive overview of my educational background and professional certifications that showcase my commitment to continuous learning and expertise development.
        </motion.p>
      </div>

      {/* Subsection Title */}
      <motion.div
        variants={FADE_UP}
        initial={reduce ? false : "hidden"}
        animate="visible"
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.2 }}
        className="mt-10 flex items-center justify-center"
      >
        <h3
          className="text-[18px] font-semibold tracking-tight text-neutral-900 dark:text-white"
          style={{ fontFamily: "var(--font-overused-grotesk)" }}
        >
          Educational Qualifications
        </h3>
      </motion.div>

      {/* Wide 3-Card Grid for Degrees */}
      <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3">
        {content.education.map((item, idx) => (
          <motion.div
            key={item.degree}
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.25 + idx * 0.08 }}
            className="group flex flex-col overflow-hidden rounded-[16px] border border-neutral-200/80 bg-neutral-50/70 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800/80 dark:bg-[#141414]/90 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] dark:hover:border-neutral-700"
          >
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <img
                src={item.image}
                alt={item.institution}
                draggable={false}
                className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <h4 className="text-[16px] font-bold leading-snug text-neutral-900 dark:text-white">
                {item.degree}
              </h4>
              <p className="mt-1 text-[13.5px] font-medium text-neutral-600 dark:text-neutral-400">
                {item.institution}
              </p>
              <p className="mt-1.5 border-b border-neutral-200/60 pb-3.5 font-mono text-[12px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                {item.grade}
              </p>

              {/* Highlights List */}
              <ul className="mt-4 space-y-2.5">
                {item.highlights.map((hl, hIdx) => (
                  <li
                    key={hIdx}
                    className="flex items-start gap-2.5 text-[12.5px] leading-relaxed text-neutral-600 dark:text-neutral-300"
                  >
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600"
                    />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Participation & Certifications Section Header */}
      <motion.div
        variants={FADE_UP}
        initial={reduce ? false : "hidden"}
        animate="visible"
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
        className="mt-20 flex flex-col items-center justify-center text-center"
      >
        <h3
          className="text-[20px] font-bold tracking-tight text-neutral-900 dark:text-white sm:text-[24px]"
          style={{ fontFamily: "var(--font-overused-grotesk)" }}
        >
          Participation &amp; Certifications
        </h3>
        <div className="mt-2.5 h-[2px] w-12 rounded-full bg-neutral-900 dark:bg-white" />
      </motion.div>

      {/* 6-Card Grid for Certifications & Participations */}
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {content.certifications.map((item, idx) => (
          <motion.div
            key={item.title}
            variants={FADE_UP}
            initial={reduce ? false : "hidden"}
            animate="visible"
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.35 + idx * 0.06 }}
            className="group flex flex-col items-center justify-between rounded-[16px] border border-neutral-200/80 bg-neutral-50/70 p-5 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 hover:border-neutral-300 hover:shadow-lg dark:border-neutral-800/80 dark:bg-[#141414]/90 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)] dark:hover:border-neutral-700"
          >
            {/* Image Container - Full Certificate Display */}
            <div className="flex aspect-[16/11] w-full items-center justify-center overflow-hidden rounded-[10px] bg-white p-2 dark:bg-white shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
              <img
                src={item.image}
                alt={item.title}
                draggable={false}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Card Content */}
            <div className="mt-4 flex flex-1 w-full flex-col items-center justify-start">
              <h4 className="text-[14.5px] font-bold leading-snug text-neutral-900 dark:text-white">
                {item.title}
              </h4>
              <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                {item.description}
              </p>
              <p className="mt-2 font-mono text-[11px] text-neutral-400 dark:text-neutral-500">
                {item.date}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
