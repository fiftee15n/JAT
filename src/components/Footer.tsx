"use client";

import React from "react";
import Logo from "./Logo";
import { ArrowUp, RotateCcw, Heart, Code2 } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolioData";

interface FooterProps {
  onReplayIntro: () => void;
  isDark: boolean;
}

export default function Footer({ onReplayIntro, isDark }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-850 bg-white/50 dark:bg-zinc-950/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Name */}
          <div className="flex items-center gap-3">
            <Logo size={28} isWhiteTheme={!isDark} />
            <div className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              Designed & Engineered by <span className="font-semibold text-zinc-900 dark:text-zinc-200">{PERSONAL_INFO.name}</span>
            </div>
          </div>

          {/* Quick links & Replay */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <button
              onClick={onReplayIntro}
              className="hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Intro Greetings</span>
            </button>
            <span>•</span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Systems Normal</span>
            </div>
            <span>•</span>
            <span>Next.js 15 & TS</span>
          </div>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 border border-zinc-200 dark:border-zinc-800 transition-colors cursor-pointer"
            title="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-8 text-center text-[11px] font-mono text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved. Open for world-class engineering challenges.
        </div>
      </div>
    </footer>
  );
}
