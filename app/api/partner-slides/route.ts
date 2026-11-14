import { NextResponse } from "next/server";

// Images for the home page's Partner With Us slideshow. Anything added to or
// removed from this Drive folder shows up on the site within REVALIDATE_SECONDS.
// The folder must be shared as "Anyone with the link can view".
const FOLDER_ID = "1VqtN49qIFHMyW8fw0K6vXseDD-6EA-0C";
const REVALIDATE_SECONDS = 300;

export const revalidate = 300;

type DriveFile = { id: string; name: string };

// An empty list tells the slideshow to use its bundled fallback images.
export async function GET() {
  const key = process.env.GOOGLE_DRIVE_API_KEY;
  if (!key) return NextResponse.json({ slides: [] });

  const params = new URLSearchParams({
    q: `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id,name)",
    // File-name order, so naming files 01-..., 02-... controls slide order.
    orderBy: "name",
    pageSize: "100",
    key,
  });

  try {
    const res = await fetch(
      `https://www.googleapis.com/drive/v3/files?${params}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) {
      console.error(`partner-slides: Drive API responded ${res.status}`);
      return NextResponse.json({ slides: [] });
    }

    const data = (await res.json()) as { files?: DriveFile[] };
    const slides = (data.files ?? []).map((file) => ({
      // Google's image CDN for a publicly shared Drive file, sized for the slide.
      src: `https://lh3.googleusercontent.com/d/${file.id}=w2400`,
      name: file.name,
    }));
    return NextResponse.json({ slides });
  } catch (error) {
    console.error("partner-slides: Drive API request failed", error);
    return NextResponse.json({ slides: [] });
  }
}
