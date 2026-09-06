import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  try {
    // 1. Attempt to fetch live og:image from the user's LinkedIn profile
    const profileUrl = "https://www.linkedin.com/in/jahangir-alam-tamal-8815a8268/";
    const liRes = await fetch(profileUrl, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 86400 },
    });

    if (liRes.ok) {
      const html = await liRes.text();
      const match =
        html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
        html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/i);

      if (match && match[1]) {
        const ogImageUrl = match[1].replace(/&amp;/g, "&");

        // Fetch the actual image data from LinkedIn media CDN
        const imgRes = await fetch(ogImageUrl, {
          next: { revalidate: 86400 },
        });

        if (imgRes.ok) {
          const contentType = imgRes.headers.get("content-type") || "image/jpeg";
          const imageBuffer = await imgRes.arrayBuffer();

          return new NextResponse(imageBuffer, {
            status: 200,
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
            },
          });
        }
      }
    }
  } catch (error) {
    console.error("Failed to dynamically fetch LinkedIn avatar:", error);
  }

  // 2. Fallback to local high-res saved LinkedIn avatar
  try {
    const liveFallback = path.join(process.cwd(), "public", "linkedin-live-avatar.jpg");
    if (fs.existsSync(liveFallback)) {
      const fileBuffer = fs.readFileSync(liveFallback);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }

    const fallbackPath = path.join(process.cwd(), "public", "linkedin-avatar.png");
    if (fs.existsSync(fallbackPath)) {
      const fileBuffer = fs.readFileSync(fallbackPath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }
  } catch (fallbackError) {
    console.error("Failed to serve fallback LinkedIn avatar:", fallbackError);
  }

  // 3. Fallback redirect
  return NextResponse.redirect(new URL("/linkedin-avatar.png", "http://localhost:3000"));
}
