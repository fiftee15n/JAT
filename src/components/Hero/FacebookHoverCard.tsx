"use client";

import { useState } from "react";
import { NumberTicker } from "@/components/motion/number";

export function FacebookHoverCard() {
  const [imgSrc, setImgSrc] = useState("/api/avatar/facebook");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = () => {
    if (imgSrc === "/api/avatar/facebook") {
      setImgSrc("/facebook-avatar.jpg");
    } else if (imgSrc === "/facebook-avatar.jpg") {
      setImgSrc("/linkedin-avatar.png");
    }
  };

  return (
    <div className="flex h-[143px] w-full flex-col items-start justify-between">
      {/* Header: avatar + Follow pill */}
      <div className="flex w-full items-start justify-between">
        <div className="relative size-[56px] shrink-0 overflow-hidden rounded-full ring-2 ring-[#1877F2]/25 dark:ring-[#60a5fa]/30 bg-neutral-100 dark:bg-neutral-800">
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
          href="https://www.facebook.com/tamal.ehmad15/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] px-[14px] py-[7px] transition-all active:scale-95 shadow-sm"
        >
          <p className="whitespace-nowrap text-[13px] font-semibold leading-none tracking-[-0.2px] text-white">
            Follow
          </p>
        </a>
      </div>

      {/* Name + handle */}
      <div className="w-full pt-2">
        <div className="flex items-center gap-1.5">
          <p
            className="truncate text-[16px] font-semibold leading-snug tracking-[-0.4px] text-[#171717] dark:text-zinc-100"
            style={{ fontFamily: "var(--font-overused-grotesk)" }}
          >
            Jahangir Alam Tamal
          </p>
          <span className="size-[15px] shrink-0 text-[#1877F2]">
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-full" aria-hidden>
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </span>
        </div>
        <p className="truncate text-[12.5px] font-normal leading-tight text-[#666] dark:text-zinc-400">
          @tamal.ehmad15
        </p>
      </div>

      {/* Stats */}
      <div className="flex w-full items-center gap-4 pt-1">
        <p className="whitespace-nowrap text-[12px] leading-none tracking-[-0.2px]">
          <span className="font-semibold text-[#1877F2] dark:text-[#60a5fa]">
            <NumberTicker value={1420} className="align-middle" />
          </span>
          <span className="font-normal text-[#737373] dark:text-zinc-400"> Friends</span>
        </p>
        <span className="text-neutral-300 dark:text-neutral-700">•</span>
        <p className="whitespace-nowrap text-[12px] leading-none tracking-[-0.2px]">
          <span className="font-semibold text-[#1877F2] dark:text-[#60a5fa]">
            <NumberTicker value={980} className="align-middle" />
          </span>
          <span className="font-normal text-[#737373] dark:text-zinc-400"> Followers</span>
        </p>
      </div>
    </div>
  );
}

