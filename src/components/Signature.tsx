"use client";

export function SignatureGlyph({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Logo"
      draggable={false}
      className={`h-full w-auto object-contain dark:invert select-none ${className}`}
    />
  );
}
