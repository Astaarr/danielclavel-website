import { NextResponse } from "next/server";
import { YOUTUBE_CACHE_TTL_MS } from "@/src/config/youtube";
import {
  fetchYoutubeChannelsWithLatestVideos,
  getLocalYoutubeFallbackChannels,
  type YoutubeChannelWithLatestVideo,
} from "@/src/lib/youtube-api";

type CacheValue = {
  expiresAt: number;
  data: YoutubeChannelWithLatestVideo[];
};

let memoryCache: CacheValue | null = null;

export async function GET() {
  const now = Date.now();

  if (memoryCache && now < memoryCache.expiresAt) {
    return NextResponse.json({
      channels: memoryCache.data,
      cached: true,
      cachedUntil: memoryCache.expiresAt,
    });
  }

  try {
    const channels = await fetchYoutubeChannelsWithLatestVideos();

    memoryCache = {
      data: channels,
      expiresAt: now + YOUTUBE_CACHE_TTL_MS,
    };

    return NextResponse.json({
      channels,
      cached: false,
      cachedUntil: memoryCache.expiresAt,
    });
  } catch (error) {
    const fallbackChannels = getLocalYoutubeFallbackChannels();

    memoryCache = {
      data: fallbackChannels,
      expiresAt: now + YOUTUBE_CACHE_TTL_MS,
    };

    return NextResponse.json({
      channels: fallbackChannels,
      cached: true,
      cachedUntil: memoryCache.expiresAt,
      fallback: true,
      error:
        error instanceof Error
          ? error.message
          : "No se pudo obtener la informacion de YouTube.",
    });
  }
}
