import { NextResponse } from "next/server";

export const revalidate = 1800; // Cache for 30 minutes

export interface DayData {
  date: string;
  count: number;
  level: number;
  label: string;
  dayOfWeek: number; // 0 = Sun, 6 = Sat
  inYear: boolean;
}

export interface ContributionsResponse {
  total: number;
  year: number;
  weeks: DayData[][];
  months: { label: string; week: number }[];
  compactGrid: number[][]; // 7 rows x 24 cols
}

export async function GET() {
  const currentYear = new Date().getFullYear();

  try {
    const ghUrl = `https://github.com/users/fiftee15n/contributions?from=${currentYear}-01-01&to=${currentYear}-12-31`;
    const res = await fetch(ghUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      throw new Error(`GitHub returned status ${res.status}`);
    }

    const html = await res.text();

    // 1. Parse Total contributions for currentYear
    const totalMatch = html.match(/([0-9,]+)\s+contributions\s+in\s+(\d{4})/i);
    const total = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 182;

    // 2. Parse Tooltips map
    const tooltipMap = new Map<string, string>();
    const tipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
    let tm;
    while ((tm = tipRegex.exec(html)) !== null) {
      tooltipMap.set(tm[1], tm[2].trim());
    }

    // 3. Map all day cells with data-date
    const tdRegex = /<td[^>]*data-date="([^"]+)"[^>]*id="([^"]+)"[^>]*data-level="([^"]+)"[^>]*class="[^"]*ContributionCalendar-day[^"]*"[^>]*>/g;
    const dayMap = new Map<string, { count: number; level: number }>();
    let dm;
    while ((dm = tdRegex.exec(html)) !== null) {
      const dateStr = dm[1];
      const id = dm[2];
      const level = parseInt(dm[3], 10) || 0;
      const tipText = tooltipMap.get(id) || "";
      const countMatch = tipText.match(/(\d+)\s+contribution/);
      const count = countMatch
        ? parseInt(countMatch[1], 10)
        : tipText.includes("No contribution")
        ? 0
        : level > 0
        ? level
        : 0;

      dayMap.set(dateStr, { count, level });
    }

    // 4. Build complete Jan 1 -> Dec 31 calendar grid for currentYear
    const jan1 = new Date(Date.UTC(currentYear, 0, 1));
    const startSunday = new Date(jan1);
    startSunday.setUTCDate(jan1.getUTCDate() - jan1.getUTCDay()); // Align to previous Sunday

    const dec31 = new Date(Date.UTC(currentYear, 11, 31));
    const endSaturday = new Date(dec31);
    endSaturday.setUTCDate(dec31.getUTCDate() + (6 - dec31.getUTCDay())); // Align to following Saturday

    const weeks: DayData[][] = [];
    let curr = new Date(startSunday);
    let currentWeek: DayData[] = [];

    while (curr <= endSaturday) {
      const dateStr = curr.toISOString().split("T")[0];
      const dObj = new Date(curr);
      const label = dObj.toLocaleDateString("en-US", {
        timeZone: "UTC",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const dayOfWeek = dObj.getUTCDay();
      const inYear = dObj.getUTCFullYear() === currentYear;

      const data = dayMap.get(dateStr);
      const count = data ? data.count : 0;
      const level = data ? data.level : 0;

      currentWeek.push({
        date: dateStr,
        count,
        level,
        label,
        dayOfWeek,
        inYear,
      });

      if (dayOfWeek === 6) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      curr.setUTCDate(curr.getUTCDate() + 1);
    }

    // 5. Compute Month headers across Jan -> Dec
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const months: { label: string; week: number }[] = [];
    let lastMonth = -1;

    weeks.forEach((w, wi) => {
      // Find the primary day in this week
      const midDay = w[3] || w[0];
      const m = new Date(midDay.date).getUTCMonth();
      if (m !== lastMonth) {
        months.push({ label: monthNames[m], week: wi });
        lastMonth = m;
      }
    });

    // 6. Compact 7x24 grid for GitHubHoverCard
    const recent24Weeks = weeks.slice(-24);
    const compactGrid: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0));

    recent24Weeks.forEach((week, colIdx) => {
      for (let rowIdx = 0; rowIdx < 7; rowIdx++) {
        if (colIdx < 24 && week[rowIdx]) {
          compactGrid[rowIdx][colIdx] = week[rowIdx].level;
        }
      }
    });

    const response: ContributionsResponse = {
      total,
      year: currentYear,
      weeks,
      months,
      compactGrid,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error fetching yearly GitHub contributions:", error);

    // Fallback using jogruber API or static structure
    try {
      const res2 = await fetch(`https://github-contributions-api.jogruber.de/v4/fiftee15n?y=${currentYear}`);
      if (res2.ok) {
        const json2 = await res2.json();
        const total = json2.total?.[currentYear] ?? 182;
        const dayMap = new Map<string, { count: number; level: number }>();

        if (json2.contributions && Array.isArray(json2.contributions)) {
          for (const c of json2.contributions) {
            dayMap.set(c.date, { count: c.count, level: c.level });
          }
        }

        const jan1 = new Date(Date.UTC(currentYear, 0, 1));
        const startSunday = new Date(jan1);
        startSunday.setUTCDate(jan1.getUTCDate() - jan1.getUTCDay());

        const dec31 = new Date(Date.UTC(currentYear, 11, 31));
        const endSaturday = new Date(dec31);
        endSaturday.setUTCDate(dec31.getUTCDate() + (6 - dec31.getUTCDay()));

        const weeks: DayData[][] = [];
        let curr = new Date(startSunday);
        let currentWeek: DayData[] = [];

        while (curr <= endSaturday) {
          const dateStr = curr.toISOString().split("T")[0];
          const dObj = new Date(curr);
          const label = dObj.toLocaleDateString("en-US", {
            timeZone: "UTC",
            month: "short",
            day: "numeric",
            year: "numeric",
          });
          const dayOfWeek = dObj.getUTCDay();
          const inYear = dObj.getUTCFullYear() === currentYear;

          const data = dayMap.get(dateStr);
          const count = data ? data.count : 0;
          const level = data ? data.level : 0;

          currentWeek.push({
            date: dateStr,
            count,
            level,
            label,
            dayOfWeek,
            inYear,
          });

          if (dayOfWeek === 6) {
            weeks.push(currentWeek);
            currentWeek = [];
          }

          curr.setUTCDate(curr.getUTCDate() + 1);
        }

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const months: { label: string; week: number }[] = [];
        let lastMonth = -1;

        weeks.forEach((w, wi) => {
          const midDay = w[3] || w[0];
          const m = new Date(midDay.date).getUTCMonth();
          if (m !== lastMonth) {
            months.push({ label: monthNames[m], week: wi });
            lastMonth = m;
          }
        });

        const recent24Weeks = weeks.slice(-24);
        const compactGrid: number[][] = Array.from({ length: 7 }, () => Array(24).fill(0));

        recent24Weeks.forEach((week, colIdx) => {
          for (let rowIdx = 0; rowIdx < 7; rowIdx++) {
            if (colIdx < 24 && week[rowIdx]) {
              compactGrid[rowIdx][colIdx] = week[rowIdx].level;
            }
          }
        });

        return NextResponse.json(
          {
            total,
            year: currentYear,
            weeks,
            months,
            compactGrid,
          },
          { status: 200 }
        );
      }
    } catch {}

    return NextResponse.json(
      {
        total: 182,
        year: currentYear,
        weeks: [],
        months: [],
        compactGrid: Array.from({ length: 7 }, () => Array(24).fill(0)),
      },
      { status: 200 }
    );
  }
}
