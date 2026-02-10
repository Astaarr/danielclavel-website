export type YoutubeChannelConfig = {
  key: "main" | "vlogs" | "gaming-finanzas";
  label: string;
  channelId: string;
  channelUrl: string;
  manualFallback: {
    channelName: string;
    channelThumbnail: string | null;
    latestVideo: {
      title: string;
      thumbnail: string | null;
      url: string;
    } | null;
  };
};

export const youtubeChannels: YoutubeChannelConfig[] = [
  {
    key: "main",
    label: "Canal principal",
    channelId: "UCH_AjFTiZLgM7bhKIDIQ8qA",
    channelUrl: "https://www.youtube.com/channel/UCH_AjFTiZLgM7bhKIDIQ8qA",
    manualFallback: {
      channelName: "Daniel Clavel",
      channelThumbnail: null,
      latestVideo: {
        title: "Actualiza este titulo manualmente",
        thumbnail: null,
        url: "https://www.youtube.com/watch?v=REPLACE_WITH_MAIN_VIDEO_ID",
      },
    },
  },
  {
    key: "vlogs",
    label: "Canal vlogs",
    channelId: "UCJ13cUsvAcCYzc0vzh-N2lg",
    channelUrl: "https://www.youtube.com/channel/UCJ13cUsvAcCYzc0vzh-N2lg",
    manualFallback: {
      channelName: "Daniel Clavel Vlogs",
      channelThumbnail: null,
      latestVideo: {
        title: "Actualiza este titulo manualmente",
        thumbnail: null,
        url: "https://www.youtube.com/watch?v=REPLACE_WITH_VLOGS_VIDEO_ID",
      },
    },
  },
  {
    key: "gaming-finanzas",
    label: "Canal gaming/finanzas",
    channelId: "UCthV-Ldkf1psq_zEsYWoxXA",
    channelUrl: "https://www.youtube.com/channel/UCthV-Ldkf1psq_zEsYWoxXA",
    manualFallback: {
      channelName: "Daniel Clavel Gaming/Finanzas",
      channelThumbnail: null,
      latestVideo: {
        title: "Actualiza este titulo manualmente",
        thumbnail: null,
        url: "https://www.youtube.com/watch?v=REPLACE_WITH_GAMING_VIDEO_ID",
      },
    },
  },
];

export const YOUTUBE_CACHE_TTL_MS = 15 * 60 * 1000;

export function isConfiguredYoutubeChannelId(channelId: string): boolean {
  return channelId.startsWith("UC") && channelId.length >= 20;
}
