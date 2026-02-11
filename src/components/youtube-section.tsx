"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";
import Image from "next/image";
import { youtubeChannels, YOUTUBE_CACHE_TTL_MS } from "@/src/config/youtube";

type ChannelFromApi = {
  key: string;
  label: string;
  channelId: string;
  channelUrl: string;
  channelName: string;
  channelThumbnail: string | null;
  latestVideo: {
    title: string;
    thumbnail: string | null;
    url: string;
  } | null;
};

type ApiResponse = {
  channels?: ChannelFromApi[];
  error?: string;
};

type CachedYoutubeResponse = {
  savedAt: number;
  channels: ChannelFromApi[];
};

const CACHE_KEY = "yt-section-cache-v1";

function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") {
    return false;
  }

  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
}

function toYoutubeAppUrl(webUrl: string): string | null {
  try {
    const url = new URL(webUrl);

    if (!url.hostname.includes("youtube.com") && !url.hostname.includes("youtu.be")) {
      return null;
    }

    if (url.hostname.includes("youtu.be")) {
      const videoId = url.pathname.replace("/", "").trim();
      return videoId ? `youtube://watch?v=${videoId}` : null;
    }

    const videoId = url.searchParams.get("v");

    if (videoId) {
      return `youtube://watch?v=${videoId}`;
    }

    const channelMatch = url.pathname.match(/^\/channel\/([^/]+)/i);

    if (channelMatch?.[1]) {
      return `youtube://channel/${channelMatch[1]}`;
    }

    return null;
  } catch {
    return null;
  }
}

function normalizeImageSrc(src: string | null): string | null {
  if (!src) {
    return null;
  }

  const value = src.trim();

  if (!value) {
    return null;
  }

  if (value.startsWith("/")) {
    return value;
  }

  if (value.startsWith("//")) {
    return `https:${value}`;
  }

  try {
    const parsed = new URL(value);

    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return value;
    }

    return null;
  } catch {
    return null;
  }
}

function openYoutubeSmart(event: MouseEvent<HTMLAnchorElement>, webUrl: string) {
  if (!isMobileDevice()) {
    return;
  }

  const appUrl = toYoutubeAppUrl(webUrl);

  if (!appUrl) {
    return;
  }

  event.preventDefault();

  const startedAt = Date.now();
  window.location.href = appUrl;

  window.setTimeout(() => {
    if (Date.now() - startedAt < 1900) {
      window.location.href = webUrl;
    }
  }, 1100);
}

function LatestVideoCard({
  channelName,
  title,
  thumbnail,
  url,
}: {
  channelName: string;
  title: string;
  thumbnail: string | null;
  url: string;
}) {
  const thumbnailSrc = normalizeImageSrc(thumbnail);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => openYoutubeSmart(event, url)}
      className="mt-4 grid grid-cols-[104px_1fr] gap-3 rounded-xl border border-neutral-200/90 bg-neutral-50/70 p-2 transition hover:bg-neutral-100/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)] dark:border-neutral-800 dark:bg-neutral-900/70 dark:hover:bg-neutral-900"
      aria-label={`Ver ultimo video de ${channelName}: ${title}`}
    >
      <span className="relative aspect-video overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
        {thumbnailSrc ? (
          <Image src={thumbnailSrc} alt={title} fill sizes="104px" className="object-cover" />
        ) : null}
      </span>
      <span className="self-center text-sm font-medium leading-snug text-neutral-800 dark:text-neutral-100">
        {title}
      </span>
    </a>
  );
}

function readCache(): ChannelFromApi[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as CachedYoutubeResponse;

    if (Date.now() - parsed.savedAt > YOUTUBE_CACHE_TTL_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return parsed.channels;
  } catch {
    return null;
  }
}

function writeCache(channels: ChannelFromApi[]) {
  try {
    const payload: CachedYoutubeResponse = {
      savedAt: Date.now(),
      channels,
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore write failures.
  }
}

export function YouTubeSection({ title }: { title: string }) {
  const [status, setStatus] = useState<"loading" | "ready" | "empty" | "error">("loading");
  const [channels, setChannels] = useState<ChannelFromApi[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const cachedChannels = readCache();

    if (cachedChannels) {
      setChannels(cachedChannels);
      setStatus(cachedChannels.length > 0 ? "ready" : "empty");
      return;
    }

    async function fetchChannels() {
      try {
        const response = await fetch("/api/youtube/channels", { method: "GET" });
        const data = (await response.json()) as ApiResponse;

        if (!response.ok) {
          throw new Error(data.error ?? "No se pudo cargar YouTube.");
        }

        const apiChannels = data.channels ?? [];
        writeCache(apiChannels);
        setChannels(apiChannels);
        setStatus(apiChannels.length > 0 ? "ready" : "empty");
      } catch (error) {
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Error inesperado.");
      }
    }

    fetchChannels();
  }, []);

  return (
    <section id="youtube" aria-labelledby="youtube-title" className="mt-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 id="youtube-title" className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          {title}
        </h2>
        <span className="text-xs text-neutral-500 dark:text-neutral-400">3 canales</span>
      </div>

      {status === "loading" ? (
        <div className="grid gap-3">
          {youtubeChannels.map((channel) => (
            <div
              key={channel.key}
              className="h-36 animate-pulse rounded-2xl border border-neutral-200 bg-neutral-100/75 dark:border-neutral-800 dark:bg-neutral-900/70"
            />
          ))}
        </div>
      ) : null}

      {status === "error" ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 text-sm text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/35 dark:text-amber-200">
          {errorMessage || "No se pudo cargar la seccion de YouTube."}
        </div>
      ) : null}

      {status === "empty" ? (
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-300">
          Aun no hay datos de YouTube. Configura los `channelIds` en `src/config/youtube.ts`.
        </div>
      ) : null}

      {status === "ready" ? (
        <div className="grid gap-3">
          {channels.map((channel) => {
            const channelThumbnailSrc = normalizeImageSrc(channel.channelThumbnail);

            return (
            <article
              key={channel.key}
              className="rounded-2xl border border-neutral-200/90 bg-white p-4 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.6)] transition hover:-translate-y-0.5 dark:border-neutral-800 dark:bg-neutral-950"
            >
              <a
                href={channel.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => openYoutubeSmart(event, channel.channelUrl)}
                className="group inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)]"
                aria-label={`Abrir ${channel.label} en YouTube`}
              >
                <span className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800">
                  {channelThumbnailSrc ? (
                    <Image
                      src={channelThumbnailSrc}
                      alt={channel.channelName}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : null}
                </span>

                <span>
                  <span className="block text-sm text-neutral-500 dark:text-neutral-400">{channel.label}</span>
                  <span className="block text-base font-medium text-neutral-900 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-200">
                    {channel.channelName}
                  </span>
                </span>
              </a>

              {channel.latestVideo ? (
                <LatestVideoCard
                  channelName={channel.channelName}
                  title={channel.latestVideo.title}
                  thumbnail={channel.latestVideo.thumbnail}
                  url={channel.latestVideo.url}
                />
              ) : (
                <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
                  Ultimo video no disponible.
                </p>
              )}
            </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
