"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  FolderGit2,
  X,
  Layers,
  CheckCircle2,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { PROJECTS, Project } from "@/data/portfolioData";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = [
    "All",
    "Full Stack",
    "Backend & Cloud",
    "AI / Machine Learning",
    "UI & Creative",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>FEATURED WORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Production Systems & Flagship Projects
          </h2>
          <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A curated selection of real-world platforms, high-concurrency engines, and developer tooling built from the ground up.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === category
                  ? "bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 shadow-sm"
                  : "bg-white dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              className="glass-card p-6 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                {/* Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                    {project.category}
                  </span>
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-mono text-zinc-500 hover:text-sky-500 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>System Deep Dive</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Project Title & Tagline */}
                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2 group-hover:text-sky-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-mono text-zinc-500 dark:text-zinc-400 mb-4">
                  {project.tagline}
                </p>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics Highlight */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6 p-3 rounded-xl bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80">
                  {project.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px] font-mono text-zinc-700 dark:text-zinc-300">
                      <Activity className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span className="truncate">{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-700/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 hover:text-sky-500 transition-colors inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>View Architecture</span>
                  <Layers className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                      title="GitHub Repository"
                    >
                      <GithubIcon size={16} />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:bg-sky-500 dark:hover:bg-sky-400 hover:text-white dark:hover:text-zinc-900 transition-all cursor-pointer"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Deep Dive Modal */}
        <AnimatePresence>
          {activeModalProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalProject(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-mono text-sky-500 font-semibold uppercase">
                      {activeModalProject.category}
                    </span>
                    <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mt-1">
                      {activeModalProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-6 leading-relaxed">
                  {activeModalProject.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    Engineering Highlights
                  </h4>
                  <div className="space-y-2">
                    {activeModalProject.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture Details */}
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    System Architecture & Design Decisions
                  </h4>
                  <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-zinc-800 space-y-2">
                    {activeModalProject.architectureDetails.map((a, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-mono">
                        <span className="text-sky-500">›</span>
                        <span>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Close
                  </button>
                  {activeModalProject.githubUrl && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:bg-sky-500 dark:hover:bg-sky-400 hover:text-white cursor-pointer"
                    >
                      <GithubIcon size={14} />
                      <span>Source Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
