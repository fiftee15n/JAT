"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface IntroSplashProps {
  onComplete: () => void;
}

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Ciao",
  "Hola",
  "こんにちは",
  "Hallo",
  "Olá",
  "नमस्ते",
  "你好",
  "مرحبا",
  "Hej",
  "Hello",
];

export default function IntroSplash({ onComplete }: IntroSplashProps) {
  const [index, setIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Quick cycling through greetings matching reference site
    const intervalTime = 190; // ms per word
    const total = GREETINGS.length;

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < total - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            handleExit();
          }, 300);
          return prev;
        }
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  const handleExit = () => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 700);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.7,
              ease: [0.76, 0, 0.24, 1],
            },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white text-black select-none"
        >
          {/* Central Logo & Greeting Showcase */}
          <div className="flex flex-col items-center justify-center gap-6 px-4">
            {/* User Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={120}
                priority
                className="w-full h-full object-contain"
              />
            </motion.div>

            {/* Cycling Multilingual Greeting */}
            <div className="h-10 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="flex items-center justify-center gap-3"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-black shrink-0" />
                  <span className="text-2xl sm:text-3xl font-medium tracking-tight text-black font-sans">
                    {GREETINGS[index]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
