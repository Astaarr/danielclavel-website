import { NextResponse } from "next/server";
import { incrementClick } from "@/src/lib/tracking-store";

type TrackBody = {
  slug?: string;
};

export async function POST(request: Request) {
  let body: TrackBody;

  try {
    body = (await request.json()) as TrackBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.slug || typeof body.slug !== "string") {
    return NextResponse.json({ error: "'slug' is required" }, { status: 400 });
  }

  const slug = body.slug.trim().toLowerCase();
  if (!slug) {
    return NextResponse.json({ error: "'slug' cannot be empty" }, { status: 400 });
  }

  const result = await incrementClick(slug);

  return NextResponse.json({ ok: true, slug, ...result });
}
