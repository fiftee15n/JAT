"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Cpu,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  Code2,
} from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

export default function About() {
  const engineeringPillars = [
    {
      icon: Zap,
      title: "Sub-100ms Performance",
      description:
        "Every byte and millisecond counts. I optimize queries, implement multi-tier caching, and trim client bundle sizes for instant responsiveness.",
      accent: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    },
    {
      icon: ShieldCheck,
      title: "Resilience & Type-Safety",
      description:
        "Strict static typing, contract-driven APIs, idempotent workers, and automated test suites that prevent regressions before hitting production.",
      accent: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      icon: Cpu,
      title: "Distributed Architecture",
      description:
        "Designing scalable event-driven backends with Kafka, Redis, and containerized microservices ready to scale horizontally on Kubernetes & AWS.",
      accent: "text-sky-500 bg-sky-500/10 border-sky-500/20",
    },
    {
      icon: Activity,
      title: "Full-Stack Observability",
      description:
        "End-to-end monitoring with OpenTelemetry, Prometheus, and automated alerting for predictable 99.99% system availability.",
      accent: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 text-xs font-mono font-medium mb-3">
            <Code2 className="w-3.5 h-3.5" />
            <span>ENGINEERING PHILOSOPHY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Crafting Software with Precision & Care
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A look into my background, approach to complex problem-solving, and how I build systems designed to endure.
          </p>
        </div>

        {/* Story & Principles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio text */}
          <div className="lg:col-span-6 flex flex-col gap-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Transforming complex engineering problems into clean, scalable reality.
            </h3>
            {PERSONAL_INFO.bio.map((paragraph, index) => (
              <p key={index} className="text-base">
                {paragraph}
              </p>
            ))}

            <div className="mt-4 pt-6 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Modern Next.js & React 19</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Distributed Go & Node Services</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Cloud Native & Dockerized</span>
              </div>
              <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0" />
                <span>Database Indexing & Tuning</span>
              </div>
            </div>
          </div>

          {/* Pillars Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {engineeringPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div key={pillar.title} className="glass-card p-6 flex flex-col justify-between">
                  <div>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border mb-4 ${pillar.accent}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 text-base mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
