"use client";

import { useEffect, useRef, useState } from "react";
import { NumberTicker } from "@/components/motion/number";
import { useWelcomeDone } from "@/components/WelcomeDoneContext";

// month labels for the x-axis — approximate guide; the real data span is close
const MONTHS = [
  { label: "Sep", week: 0 },
  { label: "Oct", week: 5 },
  { label: "Nov", week: 9 },
  { label: "Dec", week: 13 },
  { label: "Jan", week: 18 },
  { label: "Feb", week: 22 },
  { label: "Mar", week: 26 },
  { label: "Apr", week: 31 },
  { label: "May", week: 35 },
  { label: "Jun", week: 39 },
];

// GitHub's quartile colour bands (0 = none, 1–3 = low, 4–8 = mid,
// 9–14 = high, 15+ = peak)
const LEVEL_BG = [
  "bg-neutral-200 dark:bg-[#181818]",
  "bg-neutral-300 dark:bg-[#333]",
  "bg-neutral-400 dark:bg-[#666]",
  "bg-neutral-500 dark:bg-[#adadad]",
  "bg-neutral-900 dark:bg-white",
];

const GAP = 3;
const WEEKS = 41; // 10px cells: 41 weeks × 13px = 530px — the most that fits the 540px column
const CELL = 10;
const PITCH = CELL + GAP;

function countToLevel(count: number): number {
  if (count === 0) return 0;
  if (count <= 3) return 1;
  if (count <= 8) return 2;
  if (count <= 14) return 3;
  return 4;
}

export function ContributionGraph() {
  const welcomeDone = useWelcomeDone();
  const currentYear = new Date().getFullYear();
  const [data, setData] = useState<{
    weeks: { count: number; level: number; label: string; date: string }[][];
    months: { label: string; week: number }[];
    total: number;
    year: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ count: number; label: string } | null>(null);

  // Fetch live yearly GitHub contributions
  useEffect(() => {
    fetch("/api/github/contributions")
      .then((r) => r.json())
      .then((json) => {
        if (json.weeks && Array.isArray(json.weeks) && json.weeks.length > 0) {
          const rawMonths = json.months || [];
          // Ensure first label is Jan
          const cleanMonths = rawMonths.filter((m: any, idx: number) => !(idx === 0 && m.label === "Dec"));

          setData({
            weeks: json.weeks,
            months: cleanMonths,
            total: json.total ?? 182,
            year: json.year ?? currentYear,
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load yearly contributions:", err);
        setLoading(false);
      });
  }, [currentYear]);

  // When mounted or updated, start with the graph scrolled to recent activity if overflowing
  useEffect(() => {
    const el = scrollRef.current;
    if (el && el.scrollWidth > el.clientWidth) {
      // Smoothly position toward active current month
      el.scrollLeft = (el.scrollWidth - el.clientWidth) * 0.75;
    }
  }, [data]);

  if (loading) {
    return <div className="h-[137px] w-full" />;
  }

  const weeks = data?.weeks;
  const months = data?.months ?? [];
  if (!weeks || weeks.length === 0) {
    return <div className="h-[137px] w-full" />;
  }

  const total = data?.total ?? 182;
  const year = data?.year ?? currentYear;
  const numWeeks = weeks.length;
  // "Sep 6, 2026" → month / day / year so the date digits can roll too
  const dateParts = hover?.label.match(/^(\S+) (\d+), (\d+)$/);

  return (
    <div className="w-full select-none">
      <div
        ref={scrollRef}
        className="overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="min-w-max">
          <div
            className="relative mb-[10px] h-[15px]"
            style={{ width: numWeeks * PITCH - GAP }}
          >
            {months.map(({ label, week }) => (
              <span
                key={`${label}-${week}`}
                className="absolute top-0 whitespace-nowrap font-mono text-[10px] leading-none text-neutral-500 dark:text-neutral-400"
                style={{ left: week * PITCH }}
              >
                {label}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-[3px]">
            {[0, 1, 2, 3, 4, 5, 6].map((day) => (
              <div key={day} className="flex gap-[3px]">
                {weeks.map((week, wIdx) => {
                  const cell = week[day];
                  const count = cell ? cell.count : 0;
                  const level = cell ? cell.level : 0;
                  const label = cell ? cell.label : "";

                  return (
                    <div
                      key={wIdx}
                      className={`shrink-0 rounded-[2px] transition-colors duration-150 cursor-pointer ${
                        LEVEL_BG[level] || LEVEL_BG[0]
                      }`}
                      style={{ width: CELL, height: CELL }}
                      onPointerEnter={() => {
                        if (cell) setHover({ count, label });
                      }}
                      onPointerLeave={() => setHover(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-[9px] font-mono text-[10px] text-neutral-500 dark:text-neutral-400">
        {welcomeDone ? (
          <>
            <NumberTicker
              value={hover ? hover.count : total}
              suffix={
                hover
                  ? ` ${hover.count === 1 ? "contribution" : "contributions"} on`
                  : ` contributions in ${year}`
              }
              className="align-middle"
              startOnView={false}
            />
            {hover &&
              (dateParts ? (
                <>
                  {" "}
                  {dateParts[1]}{" "}
                  <NumberTicker value={Number(dateParts[2])} className="align-middle" />
                  {", "}
                  <NumberTicker value={Number(dateParts[3])} className="align-middle" />
                </>
              ) : (
                ` ${hover.label}`
              ))}
          </>
        ) : hover ? (
          `${hover.count} ${hover.count === 1 ? "contribution" : "contributions"} on ${hover.label}`
        ) : (
          `${total} contributions in ${year}`
        )}
      </p>
    </div>
  );
}