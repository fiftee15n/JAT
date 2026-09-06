"use client";

import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Terminal as TerminalIcon,
  Copy,
  Check,
  Play,
  Download,
  Sparkles,
  Mail,
  MapPin,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { PERSONAL_INFO, CODE_SNIPPET_TABS } from "@/data/portfolioData";

interface HeroProps {
  introDone: boolean;
}

export default function Hero({ introDone }: HeroProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [runOutput, setRunOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const currentSnippet = CODE_SNIPPET_TABS[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setRunOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setRunOutput("✓ [SUCCESS] System initialized in 14ms | 0 errors | 100k req/s ready 🚀");
    }, 600);
  };

  // Stagger variants for editorial entrance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center overflow-hidden bg-grid-pattern"
    >
      {/* Subtle ambient glows */}
      <div className="glow-orb w-96 h-96 -top-20 -left-20 bg-sky-500/15" />
      <div className="glow-orb w-96 h-96 top-1/2 -right-20 bg-indigo-500/15" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={introDone ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Left Column: Signature Monogram & Editorial Intro */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Top Monogram Mark */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 select-none">
                <Image
                  src="/logo.png"
                  alt="Personal Monogram"
                  width={96}
                  height={96}
                  priority
                  className="w-full h-full object-contain dark:invert"
                />
              </div>
            </motion.div>

            {/* Status Indicator */}
            <motion.div variants={itemVariants} className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{PERSONAL_INFO.availability}</span>
              </div>
            </motion.div>

            {/* Main Title / Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.12] mb-5"
            >
              Hi, I&apos;m <span className="text-zinc-950 dark:text-white">{PERSONAL_INFO.name}</span>.{" "}
              <br className="hidden sm:inline" />
              <span className="text-gradient-cyan">Software Engineer</span> & Systems Architect.
            </motion.h1>

            {/* Editorial Lead Paragraphs */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed mb-4"
            >
              Based in {PERSONAL_INFO.location}. I engineer distributed backend services, high-concurrency cloud architectures, and fluid modern web applications.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed mb-8"
            >
              I bridge the gap between rigorous system design and intuitive UI craftsmanship—shipping resilient software that scales reliably under heavy production load.
            </motion.p>

            {/* Action Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-zinc-50 dark:text-zinc-900 shadow-md transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700/60 transition-all"
              >
                <span>Get In Touch</span>
                <Mail className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Resume preview: Alex Morgan - Senior Software Engineer. Contact directly for full credentials or custom CV.");
                }}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Resume</span>
              </a>
            </motion.div>

            {/* Social & Connect Details */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 font-mono"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                {PERSONAL_INFO.location}
              </span>

              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="GitHub"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-1.5 rounded-lg hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={16} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Interactive Code Terminal */}
          <motion.div variants={itemVariants} className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/80 shadow-2xl shadow-sky-950/20 text-zinc-300">
              {/* Terminal Window Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/90 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-zinc-400 flex items-center gap-1.5">
                    <TerminalIcon className="w-3.5 h-3.5 text-sky-400" />
                    developer-workspace
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 text-xs transition-colors cursor-pointer"
                    title="Copy code"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-mono font-medium transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3" />
                    <span>{isRunning ? "Running..." : "Run"}</span>
                  </button>
                </div>
              </div>

              {/* Code File Tabs */}
              <div className="flex items-center gap-1 px-3 pt-2 bg-zinc-900/50 border-b border-zinc-800/60 overflow-x-auto">
                {CODE_SNIPPET_TABS.map((tab, idx) => (
                  <button
                    key={tab.filename}
                    onClick={() => {
                      setActiveTab(idx);
                      setRunOutput(null);
                    }}
                    className={`px-3 py-1.5 text-xs font-mono rounded-t-lg transition-colors cursor-pointer ${
                      activeTab === idx
                        ? "bg-zinc-950 text-sky-400 border-t border-l border-r border-zinc-800"
                        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/40"
                    }`}
                  >
                    {tab.filename}
                  </button>
                ))}
              </div>

              {/* Code Body */}
              <div className="p-4 font-mono text-xs overflow-x-auto min-h-[220px] max-h-[280px]">
                <pre className="text-zinc-300 leading-relaxed">
                  <code>{currentSnippet.code}</code>
                </pre>
              </div>

              {/* Execution Console Output */}
              {runOutput && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="px-4 py-2.5 bg-zinc-900 border-t border-zinc-800 font-mono text-xs text-emerald-400 flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                  <span>{runOutput}</span>
                </motion.div>
              )}

              {/* Terminal status line */}
              <div className="px-4 py-2 bg-zinc-950/90 border-t border-zinc-900 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  UTF-8 • {currentSnippet.language.toUpperCase()}
                </span>
                <span>Ready</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Quick Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {PERSONAL_INFO.stats.map((stat) => (
            <div key={stat.label} className="glass-card p-5 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 font-mono">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
