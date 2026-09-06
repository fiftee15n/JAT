"use client";

import { useEffect, useState } from "react";
import { NumberTicker } from "@/components/motion/number";

const LEVEL_BG = [
  "bg-neutral-200 dark:bg-[#181818]",
  "bg-neutral-300 dark:bg-[#333]",
  "bg-neutral-400 dark:bg-[#666]",
  "bg-neutral-500 dark:bg-[#adadad]",
  "bg-neutral-900 dark:bg-white",
];

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

interface DayItem {
  date: string;
  count: number;
  level: number;
  label: string;
  dayOfWeek: number;
  inYear: boolean;
}

export function GitHubHoverCard() {
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState<{
    total: number;
    year: number;
    weeks: DayItem[][];
    months: { label: string; week: number }[];
  } | null>(null);
  const [hoverCell, setHoverCell] = useState<{ count: number; label: string } | null>(null);

  useEffect(() => {
    fetch("/api/github/contributions")
      .then((res) => res.json())
      .then((json) => {
        if (json.total !== undefined && json.weeks) {
          const rawMonths = json.months || [];
          const cleanMonths = rawMonths.filter((m: any, idx: number) => !(idx === 0 && m.label === "Dec"));

          setData({
            total: json.total,
            year: json.year || currentYear,
            weeks: json.weeks,
            months: cleanMonths,
          });
        }
      })
      .catch((err) => console.error("Failed to load GitHub hover card data:", err));
  }, [currentYear]);

  const total = data?.total ?? 182;
  const year = data?.year ?? currentYear;
  const weeks = data?.weeks;
  const months = data?.months ?? [];

  return (
    <div className="flex h-[112px] w-full flex-col items-start justify-between select-none">
      {/* Header */}
      <div className="flex w-full items-center justify-between">
        <a
          href="https://github.com/fiftee15n"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-[#525252] hover:text-black dark:text-white dark:hover:text-zinc-200 transition-colors"
        >
          <svg
            width={16}
            height={16}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="size-[16px] shrink-0"
          >
            <path
              d="M10 1.25C5.16797 1.25 1.25 5.26953 1.25 10.2227C1.25 14.1875 3.75781 17.5469 7.23437 18.7344C7.28906 18.7461 7.33594 18.75 7.38281 18.75C7.70703 18.75 7.83203 18.5117 7.83203 18.3047C7.83203 18.0898 7.82422 17.5273 7.82031 16.7773C7.49219 16.8516 7.19922 16.8828 6.9375 16.8828C5.25391 16.8828 4.87109 15.5742 4.87109 15.5742C4.47266 14.5391 3.89844 14.2617 3.89844 14.2617C3.13672 13.7266 3.89453 13.7109 3.95312 13.7109H3.95703C4.83594 13.7891 5.29688 14.6406 5.29688 14.6406C5.73438 15.4062 6.32031 15.6211 6.84375 15.6211C7.25391 15.6211 7.625 15.4883 7.84375 15.3867C7.92188 14.8086 8.14844 14.4141 8.39844 14.1875C6.45703 13.9609 4.41406 13.1914 4.41406 9.75391C4.41406 8.77344 4.75391 7.97266 5.3125 7.34766C5.22266 7.12109 4.92187 6.20703 5.39844 4.97266C5.39844 4.97266 5.46094 4.95313 5.59375 4.95313C5.91016 4.95313 6.625 5.07422 7.80469 5.89453C8.50391 5.69531 9.25 5.59766 9.99609 5.59375C10.7383 5.59766 11.4883 5.69531 12.1875 5.89453C13.3672 5.07422 14.082 4.95313 14.3984 4.95313C14.5313 4.95313 14.5938 4.97266 14.5938 4.97266C15.0703 6.20703 14.7695 7.12109 14.6797 7.34766C15.2383 7.97656 15.5781 8.77734 15.5781 9.75391C15.5781 13.1992 13.5313 13.957 11.582 14.1797C11.8945 14.457 12.1758 15.0039 12.1758 15.8398C12.1641 17.0391 12.1641 18.0078 12.1641 18.3008C12.1641 18.5117 12.2852 18.75 12.6094 18.75C12.6562 18.75 12.7109 18.7461 12.7656 18.7344C16.2461 17.5469 18.75 14.1836 18.75 10.2227C18.75 5.26953 14.832 1.25 10 1.25Z"
              fill="currentColor"
            />
          </svg>
          <span className="text-[12px] font-semibold tracking-[-0.2px]">fiftee15n</span>
        </a>

        <p className="text-[11.5px] leading-none tracking-[-0.2px] whitespace-nowrap">
          {hoverCell ? (
            <span className="font-medium text-[#262626] dark:text-zinc-100">
              {hoverCell.count} on {hoverCell.label}
            </span>
          ) : (
            <>
              <span className="font-semibold text-[#262626] dark:text-zinc-100">
                <NumberTicker value={total} className="align-middle" />
              </span>
              <span className="font-normal text-[#737373] dark:text-zinc-400"> in {year}</span>
            </>
          )}
        </p>
      </div>

      {/* Main Full Year Grid */}
      <div className="w-full pt-2">
        {/* Month labels header */}
        <div className="relative mb-[3px] h-[10px] w-full">
          {months.map(({ label, week }) => (
            <span
              key={`${label}-${week}`}
              className="absolute top-0 font-mono text-[7px] leading-none text-neutral-400 dark:text-neutral-500"
              style={{ left: `${(week / 53) * 100}%` }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* 7 rows of 53 weeks */}
        <div className="flex flex-col gap-[1.5px] w-full">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => (
            <div key={day} className="flex gap-[1.5px] justify-between w-full">
              {weeks
                ? weeks.map((week, wIdx) => {
                    const cell = week[day];
                    const level = cell ? cell.level : 0;
                    const count = cell ? cell.count : 0;
                    const label = cell ? cell.label : "";

                    return (
                      <div
                        key={wIdx}
                        className={`flex-1 h-[3.8px] rounded-[0.5px] transition-colors ${
                          LEVEL_BG[level] || LEVEL_BG[0]
                        }`}
                        onPointerEnter={() => {
                          if (cell) setHoverCell({ count, label });
                        }}
                        onPointerLeave={() => setHoverCell(null)}
                      />
                    );
                  })
                : Array.from({ length: 53 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 h-[3.8px] rounded-[0.5px] bg-neutral-200 dark:bg-[#181818]"
                    />
                  ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex w-full items-center justify-between pt-1">
        <span className="font-mono text-[8px] text-neutral-400 dark:text-neutral-500">Jan 1 – Dec 31</span>
        <div className="flex items-center gap-1">
          <span className="font-mono text-[7.5px] text-neutral-400 dark:text-neutral-500">Less</span>
          <div className="flex gap-[1.5px]">
            {LEVEL_BG.map((bg, idx) => (
              <div key={idx} className={`size-[4px] rounded-[0.5px] ${bg}`} />
            ))}
          </div>
          <span className="font-mono text-[7.5px] text-neutral-400 dark:text-neutral-500">More</span>
        </div>
      </div>
    </div>
  );
}
