"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Layers,
  Server,
  Database,
  Cloud,
  Terminal,
  Cpu,
  Check,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/portfolioData";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Layout":
        return <Layers className="w-4 h-4" />;
      case "Server":
        return <Server className="w-4 h-4" />;
      case "Database":
        return <Database className="w-4 h-4" />;
      case "Cloud":
        return <Cloud className="w-4 h-4" />;
      default:
        return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-mono font-medium mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Tech Stack & Architectural Tooling
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A comprehensive overview of the programming languages, distributed infrastructure, and frameworks I use to build robust software.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategory === idx;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(idx)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 shadow-md scale-105"
                    : "bg-white dark:bg-zinc-900/80 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
                }`}
              >
                {getCategoryIcon(cat.icon)}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Skills Display Cards */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
        >
          {SKILL_CATEGORIES[activeCategory].skills.map((skill) => (
            <div
              key={skill.name}
              className="glass-card p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm sm:text-base">
                    {skill.name}
                  </span>
                  <span className="font-mono text-xs font-bold text-sky-500 dark:text-sky-400">
                    {skill.level}%
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                  {skill.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
