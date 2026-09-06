"use client";

import { useState } from "react";
import { NumberTicker } from "@/components/motion/number";

export function LinkedInHoverCard() {
  const [imgSrc, setImgSrc] = useState("/api/avatar/linkedin");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (imgSrc === "/api/avatar/linkedin") {
      setImgSrc("/linkedin-live-avatar.jpg");
    } else if (imgSrc === "/linkedin-live-avatar.jpg") {
      setImgSrc("/linkedin-avatar.png");
    }
  };

  return (
    <div className="flex h-[143px] w-full flex-col items-start justify-between">
      {/* Header: avatar + Connect button */}
      <div className="flex w-full items-start justify-between">
        <div className="relative size-[56px] shrink-0 overflow-hidden rounded-full ring-2 ring-[#0a66c2]/25 dark:ring-[#70b5ff]/30 bg-neutral-100 dark:bg-neutral-800">
          {!isLoaded && (
            <div className="absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-800" />
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt="Jahangir Alam Tamal"
            width={56}
            height={56}
            draggable={false}
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            className={`size-full object-cover transition-opacity duration-300 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
        <a
          href="https://www.linkedin.com/in/jahangir-alam-tamal-8815a8268/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-[#0a66c2] hover:bg-[#095196] px-[14px] py-[7px] transition-all active:scale-95 shadow-sm"
        >
          <svg className="size-[13px] fill-current text-white" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <p className="whitespace-nowrap text-[13px] font-semibold leading-none tracking-[-0.2px] text-white">
            Connect
          </p>
        </a>
      </div>

      {/* Name + Title */}
      <div className="w-full pt-2">
        <div className="flex items-center gap-1.5">
          <p
            className="truncate text-[16px] font-semibold leading-snug tracking-[-0.4px] text-[#171717] dark:text-zinc-100"
            style={{ fontFamily: "var(--font-overused-grotesk)" }}
          >
            Jahangir Alam Tamal
          </p>
          <span className="size-[15px] shrink-0 text-[#0a66c2] dark:text-[#70b5ff]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" aria-hidden>
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </span>
        </div>
        <p className="truncate text-[12.5px] font-normal leading-tight text-[#666] dark:text-zinc-400">
          Software Engineer at Donoro
        </p>
      </div>

      {/* Stats row */}
      <div className="flex w-full items-center gap-4 pt-1">
        <p className="whitespace-nowrap text-[12px] leading-none tracking-[-0.2px]">
          <span className="font-semibold text-[#0a66c2] dark:text-[#70b5ff]">
            <NumberTicker value={840} className="align-middle" />
          </span>
          <span className="font-normal text-[#737373] dark:text-zinc-400"> Followers</span>
        </p>
        <span className="text-neutral-300 dark:text-neutral-700">•</span>
        <p className="whitespace-nowrap text-[12px] leading-none tracking-[-0.2px]">
          <span className="font-semibold text-[#0a66c2] dark:text-[#70b5ff]">
            <NumberTicker value={500} suffix="+" className="align-middle" />
          </span>
          <span className="font-normal text-[#737373] dark:text-zinc-400"> Connections</span>
        </p>
      </div>
    </div>
  );
}

