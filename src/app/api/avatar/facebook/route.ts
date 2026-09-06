import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  try {
    // 1. Attempt to fetch live og:image from the user's Facebook profile
    const profileUrl = "https://www.facebook.com/tamal.ehmad15/";
    const fbRes = await fetch(profileUrl, {
      headers: {
        "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 86400 },
    });

    if (fbRes.ok) {
      const html = await fbRes.text();
      const match =
        html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
        html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/i);

      if (match && match[1]) {
        const ogImageUrl = match[1].replace(/&amp;/g, "&");
        
        // Fetch the actual image data
        const imgRes = await fetch(ogImageUrl, {
          headers: {
            "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
          },
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
    console.error("Failed to dynamically fetch Facebook avatar:", error);
  }

  // 2. Fallback to local high-res saved Facebook avatar or LinkedIn avatar
  try {
    const fallbackPath = path.join(process.cwd(), "public", "facebook-avatar.jpg");
    if (fs.existsSync(fallbackPath)) {
      const fileBuffer = fs.readFileSync(fallbackPath);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }

    const secondaryFallback = path.join(process.cwd(), "public", "linkedin-avatar.png");
    if (fs.existsSync(secondaryFallback)) {
      const fileBuffer = fs.readFileSync(secondaryFallback);
      return new NextResponse(fileBuffer, {
        status: 200,
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400, s-maxage=86400",
        },
      });
    }
  } catch (fallbackError) {
    console.error("Failed to serve fallback avatar:", fallbackError);
  }

  // 3. Fallback redirect if files cannot be read
  return NextResponse.redirect(new URL("/facebook-avatar.jpg", "http://localhost:3000"));
}
