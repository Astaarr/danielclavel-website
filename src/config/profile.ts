export type IconName =
  | "youtube"
  | "instagram"
  | "tiktok"
  | "soundcloud"
  | "twitch"
  | "x"
  | "github"
  | "linkedin"
  | "mail"
  | "map-pin"
  | "star"
  | "spark"
  | "globe";

export type LinkVariant = "primary" | "subtle" | "glass" | "gradient";

export type ProfileConfig = {
  profile: {
    name: string;
    tagline: string;
    avatarUrl: string;
    contactEmail?: string;
  };
  youtubeSectionTitle: string;
  socials: Array<{
    title: string;
    url: string;
    icon: IconName;
  }>;
  seo?: {
    title?: string;
    description?: string;
    siteName?: string;
    siteUrl?: string;
    ogImage?: string;
  };
};

export const profileConfig: ProfileConfig = {
  profile: {
    name: "Daniel Clavel",
    tagline: "Motivacion, Fitness y Finanzas.",
    avatarUrl: "/avatar.png",
    contactEmail: "daniel.clavelvega@gmail.com",
  },
  youtubeSectionTitle: "YouTube",
  socials: [
    { title: "Instagram", url: "https://www.instagram.com/danii_clavel", icon: "instagram" },
    { title: "TikTok", url: "https://www.tiktok.com/@danii_clavel", icon: "tiktok" },
    { title: "SoundCloud", url: "https://soundcloud.com/danii_clavel", icon: "soundcloud", },
  ],
  seo: {
    title: "Daniel Clavel | Canales oficiales",
    description: "Canales oficiales de YouTube y redes principales.",
    siteName: "Daniel Clavel",
    siteUrl: "https://danielclavel.com",
    ogImage: "/avatar.png",
  },
};
