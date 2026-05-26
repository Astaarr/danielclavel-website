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
    tagline: "",
    avatarUrl: "/avatar-2026.png",
    contactEmail: "daniel.clavelvega@gmail.com",
  },
  youtubeSectionTitle: "Destacados",
  socials: [
    { title: "Instagram", url: "https://www.instagram.com/daniel.clavel/?hl=es", icon: "instagram" },
    { title: "YouTube", url: "https://www.youtube.com/channel/UCH_AjFTiZLgM7bhKIDIQ8qA", icon: "youtube" },
    { title: "TikTok", url: "https://www.tiktok.com/@daniel_clavel", icon: "tiktok" },
    { title: "SoundCloud", url: "https://soundcloud.com/danii_clavel", icon: "soundcloud", },
  ],
  seo: {
    title: "Daniel Clavel | Canales oficiales",
    description: "Canales oficiales de YouTube y redes principales.",
    siteName: "Daniel Clavel",
    siteUrl: "https://danielclavel.com",
    ogImage: "/avatar-2026.png",
  },
};
