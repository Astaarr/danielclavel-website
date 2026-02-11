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
      channelThumbnail: "/youtube/profileyt1.png",
      latestVideo: {
        title: "La dura verdad: te vas a morir",
        thumbnail: "/youtube/miniaturaYtWeb.jpg",
        url: "https://www.youtube.com/watch?v=orU5sE3MCiU",
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
      channelThumbnail: "/youtube/profileyt2.jpg",
      latestVideo: {
        title: "Dentro de muy poco primer video del canal",
        thumbnail: null,
        url: "https://www.youtube.com/channel/UCJ13cUsvAcCYzc0vzh-N2lg",
      },
    },
  },
  {
    key: "gaming-finanzas",
    label: "Canal gaming/finanzas",
    channelId: "UCthV-Ldkf1psq_zEsYWoxXA",
    channelUrl: "https://www.youtube.com/channel/UCthV-Ldkf1psq_zEsYWoxXA",
    manualFallback: {
      channelName: "CLAVEL UNFILTERED",
      channelThumbnail: "/youtube/profileyt3.jpg",
      latestVideo: {
        title: "Dentro de muy poco primer video del canal",
        thumbnail: null,
        url: "https://www.youtube.com/channel/UCthV-Ldkf1psq_zEsYWoxXA",
      },
    },
  },
];

export const YOUTUBE_CACHE_TTL_MS = 15 * 60 * 1000;

export function isConfiguredYoutubeChannelId(channelId: string): boolean {
  return channelId.startsWith("UC") && channelId.length >= 20;
}
