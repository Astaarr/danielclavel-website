import {
  youtubeChannels,
  isConfiguredYoutubeChannelId,
  type YoutubeChannelConfig,
} from "@/src/config/youtube";

const YOUTUBE_BASE_URL = "https://www.googleapis.com/youtube/v3";

type YoutubeApiError = {
  error?: {
    message?: string;
  };
};

type YoutubeChannelResponse = {
  items?: Array<{
    id: string;
    snippet?: {
      title?: string;
      thumbnails?: {
        high?: { url?: string };
        medium?: { url?: string };
        default?: { url?: string };
      };
    };
    contentDetails?: {
      relatedPlaylists?: {
        uploads?: string;
      };
    };
  }>;
};

type YoutubePlaylistItemsResponse = {
  items?: Array<{
    snippet?: {
      title?: string;
      resourceId?: {
        videoId?: string;
      };
      thumbnails?: {
        high?: { url?: string };
        medium?: { url?: string };
        default?: { url?: string };
      };
    };
  }>;
};

type YoutubeSearchResponse = {
  items?: Array<{
    id?: {
      videoId?: string;
    };
    snippet?: {
      title?: string;
      thumbnails?: {
        high?: { url?: string };
        medium?: { url?: string };
        default?: { url?: string };
      };
    };
  }>;
};

export type YoutubeChannelWithLatestVideo = {
  key: YoutubeChannelConfig["key"];
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

export function getLocalYoutubeFallbackChannels(
  channels: YoutubeChannelConfig[] = youtubeChannels,
): YoutubeChannelWithLatestVideo[] {
  return channels.map((channel) => ({
    key: channel.key,
    label: channel.label,
    channelId: channel.channelId,
    channelUrl: channel.channelUrl,
    channelName: channel.manualFallback.channelName,
    channelThumbnail: channel.manualFallback.channelThumbnail,
    latestVideo: channel.manualFallback.latestVideo,
  }));
}

function getApiKey(): string {
  const apiKey = process.env.YOUTUBE_API_KEY ?? process.env.NEXT_PUBLIC_YT_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing YouTube API key. Set YOUTUBE_API_KEY (recommended) or NEXT_PUBLIC_YT_API_KEY.",
    );
  }

  return apiKey;
}

async function youtubeFetch<T>(path: string, params: Record<string, string>) {
  const apiKey = getApiKey();
  const url = new URL(`${YOUTUBE_BASE_URL}/${path}`);

  Object.entries({ ...params, key: apiKey }).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    let errorMessage = `YouTube API request failed (${response.status})`;

    try {
      const data = (await response.json()) as YoutubeApiError;

      if (data.error?.message) {
        errorMessage = `YouTube API error: ${data.error.message}`;
      }
    } catch {
      // Keep generic error if body is not JSON.
    }

    throw new Error(errorMessage);
  }

  return (await response.json()) as T;
}

export async function fetchYoutubeChannelsWithLatestVideos(): Promise<
  YoutubeChannelWithLatestVideo[]
> {
  const configuredChannels = youtubeChannels.filter((channel) =>
    isConfiguredYoutubeChannelId(channel.channelId),
  );

  if (configuredChannels.length === 0) {
    return getLocalYoutubeFallbackChannels(youtubeChannels);
  }

  try {
    const channelMap = new Map(configuredChannels.map((channel) => [channel.channelId, channel]));
    const channelData = await youtubeFetch<YoutubeChannelResponse>("channels", {
      part: "snippet,contentDetails",
      id: configuredChannels.map((channel) => channel.channelId).join(","),
      maxResults: String(configuredChannels.length),
    });

    const channelItems = channelData.items ?? [];

    const channelsWithVideo = await Promise.all(
      channelItems.map(async (item) => {
        const source = channelMap.get(item.id);

        if (!source) {
          return null;
        }

        const uploadsPlaylistId = item.contentDetails?.relatedPlaylists?.uploads;
        let latestVideo: YoutubeChannelWithLatestVideo["latestVideo"] = null;

        if (uploadsPlaylistId) {
          try {
            const playlistData = await youtubeFetch<YoutubePlaylistItemsResponse>("playlistItems", {
              part: "snippet",
              playlistId: uploadsPlaylistId,
              maxResults: "1",
            });

            const latestItem = playlistData.items?.[0];
            const videoId = latestItem?.snippet?.resourceId?.videoId;

            if (videoId && latestItem?.snippet?.title) {
              latestVideo = {
                title: latestItem.snippet.title,
                thumbnail:
                  latestItem.snippet.thumbnails?.high?.url ??
                  latestItem.snippet.thumbnails?.medium?.url ??
                  latestItem.snippet.thumbnails?.default?.url ??
                  null,
                url: `https://www.youtube.com/watch?v=${videoId}`,
              };
            }
          } catch {
            // Fallback when uploads playlist is not accessible for a channel.
          }
        }

        if (!latestVideo) {
          try {
            const searchData = await youtubeFetch<YoutubeSearchResponse>("search", {
              part: "snippet",
              channelId: source.channelId,
              maxResults: "1",
              order: "date",
              type: "video",
            });

            const latestSearchItem = searchData.items?.[0];
            const videoId = latestSearchItem?.id?.videoId;

            if (videoId && latestSearchItem?.snippet?.title) {
              latestVideo = {
                title: latestSearchItem.snippet.title,
                thumbnail:
                  latestSearchItem.snippet.thumbnails?.high?.url ??
                  latestSearchItem.snippet.thumbnails?.medium?.url ??
                  latestSearchItem.snippet.thumbnails?.default?.url ??
                  null,
                url: `https://www.youtube.com/watch?v=${videoId}`,
              };
            }
          } catch {
            // Keep channel visible even if latest video can't be fetched.
          }
        }

        return {
          key: source.key,
          label: source.label,
          channelId: source.channelId,
          channelUrl: source.channelUrl,
          channelName: item.snippet?.title ?? source.manualFallback.channelName,
          channelThumbnail:
            item.snippet?.thumbnails?.high?.url ??
            item.snippet?.thumbnails?.medium?.url ??
            item.snippet?.thumbnails?.default?.url ??
            source.manualFallback.channelThumbnail,
          latestVideo: latestVideo ?? source.manualFallback.latestVideo,
        };
      }),
    );

    const resultMap = new Map<string, YoutubeChannelWithLatestVideo>();

    channelsWithVideo.forEach((item) => {
      if (item) {
        resultMap.set(item.channelId, item);
      }
    });

    return configuredChannels.map((channel) => {
      return (
        resultMap.get(channel.channelId) ?? {
          key: channel.key,
          label: channel.label,
          channelId: channel.channelId,
          channelUrl: channel.channelUrl,
          channelName: channel.manualFallback.channelName,
          channelThumbnail: channel.manualFallback.channelThumbnail,
          latestVideo: channel.manualFallback.latestVideo,
        }
      );
    });
  } catch {
    return getLocalYoutubeFallbackChannels(configuredChannels);
  }
}
