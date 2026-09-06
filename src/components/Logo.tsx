"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
  isWhiteTheme?: boolean;
}

export default function Logo({ size = 48, className = "", isWhiteTheme = false }: LogoProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={size * 2}
        height={size * 2}
        priority
        className={`w-full h-full object-contain transition-all ${
          isWhiteTheme ? "" : "dark:invert brightness-100"
        }`}
      />
    </div>
  );
}
