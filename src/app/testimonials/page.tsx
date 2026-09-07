"use client";

import { ProgressiveBlur } from "@/registry/magicui/progressive-blur";
import { EducationSection } from "@/components/EducationSection";

export default function TestimonialsPage() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-start bg-background text-foreground">
      <div className="relative flex w-full flex-1 flex-col items-center justify-start px-6 pt-16 pb-48">
        <div className="w-full max-w-[1080px]">
          <EducationSection />
        </div>
      </div>

      {/* Progressive blur at bottom */}
      <ProgressiveBlur
        position="bottom"
        height="180px"
        className="fixed"
        blurLevels={[0.5, 1, 2, 4, 8, 16, 24, 32]}
      />
    </main>
  );
}

