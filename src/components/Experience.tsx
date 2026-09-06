"use client";

import React from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { EXPERIENCES } from "@/data/portfolioData";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-mono font-medium mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>CAREER TRACK RECORD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Work Experience & Milestones
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A track record of scaling high-traffic products, managing infrastructure reliability, and mentoring engineering talent.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-8 relative">
          {/* Vertical line */}
          <div className="hidden sm:block absolute left-8 top-4 bottom-4 w-px bg-zinc-200 dark:bg-zinc-800" />

          {EXPERIENCES.map((exp) => (
            <div key={exp.id} className="relative sm:pl-16">
              {/* Timeline marker node */}
              <div className="hidden sm:flex absolute left-6 top-6 -translate-x-1/2 w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-2 border-sky-500 items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-sky-500" />
              </div>

              {/* Card */}
              <div className="glass-card p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.role}
                    </h3>
                    <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                  {exp.summary}
                </p>

                {/* Achievements */}
                <div className="space-y-2 mb-6">
                  {exp.achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
                  {exp.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
