"use client";

import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Moon, Sun, Menu, X, RotateCcw, Send } from "lucide-react";

interface NavbarProps {
  onReplayIntro: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
  introDone: boolean;
}

export default function Navbar({ onReplayIntro, isDark, onToggleTheme, introDone }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["hero", "about", "skills", "projects", "experience", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-out ${
        introDone ? "opacity-100 translate-y-0 filter-none" : "opacity-0 -translate-y-3 blur-sm pointer-events-none"
      } ${
        scrolled
          ? "py-3.5 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/60 dark:border-zinc-800/80 shadow-xs"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <a href="#hero" className="flex items-center gap-3 group">
          <Logo size={32} isWhiteTheme={!isDark} />
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-sky-500 transition-colors">
              Alex Morgan
            </span>
            <span className="text-[10px] font-mono tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
              Software Engineer
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-zinc-100/80 dark:bg-zinc-900/70 border border-zinc-200/70 dark:border-zinc-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  isActive
                    ? "bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Right Actions & Live Clock */}
        <div className="hidden md:flex items-center gap-3">
          {/* Live Clock indicator */}
          {timeString && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] text-zinc-500 dark:text-zinc-400 bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/50 dark:border-zinc-800/50">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>{timeString} UTC</span>
            </div>
          )}

          {/* Replay Intro Button */}
          <button
            onClick={onReplayIntro}
            title="Replay intro greeting animation"
            className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="p-2 rounded-xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-700" />}
          </button>

          {/* Contact / Hire Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-white text-zinc-50 dark:text-zinc-900 shadow-sm transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Contact</span>
          </a>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-white/95 dark:bg-zinc-950/95 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-xl">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 py-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Greeting Intro</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900"
              >
                <Send className="w-3 h-3" />
                <span>Contact</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
