export type IconName =
  | "youtube"
  | "instagram"
  | "tiktok"
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
    location?: string;
  };
  featured?: {
    title: string;
    url: string;
    icon?: IconName;
    description?: string;
  };
  links: Array<{
    slug: string;
    title: string;
    url: string;
    icon?: IconName;
    description?: string;
    styleVariant?: LinkVariant;
  }>;
  socials: Array<{
    title: string;
    url: string;
    icon: IconName;
  }>;
  footerText?: string;
  seo?: {
    title?: string;
    description?: string;
    siteUrl?: string;
    ogImage?: string;
  };
};

export const profileConfig: ProfileConfig = {
  profile: {
    name: "Daniel Clavel",
    tagline: "Motivacion, negocio digital y contenido .",
    avatarUrl: "/avatar.svg",
    location: "Madrid, Espana",
  },
  featured: {
    title: "Nuevo video: rutina para ganar energia",
    url: "https://youtube.com",
    icon: "star",
    description: "Mira el episodio completo con mi sistema de enfoque.",
  },
  links: [
    {
      slug: "youtube-principal",
      title: "YouTube Principal",
      url: "https://youtube.com",
      icon: "youtube",
      description: "Videos semanales de mindset y crecimiento.",
      styleVariant: "primary",
    },
    {
      slug: "youtube-vlogs",
      title: "YouTube Vlogs",
      url: "https://youtube.com",
      icon: "globe",
      description: "Detras de camaras, viajes y dia a dia.",
      styleVariant: "glass",
    },
    {
      slug: "instagram",
      title: "Instagram",
      url: "https://instagram.com",
      icon: "instagram",
      description: "Contenido rapido y stories.",
      styleVariant: "subtle",
    },
    {
      slug: "tiktok",
      title: "TikTok",
      url: "https://tiktok.com",
      icon: "tiktok",
      description: "Clips cortos con ideas accionables.",
      styleVariant: "gradient",
    },
  ],
  socials: [
    { title: "Instagram", url: "https://instagram.com", icon: "instagram" },
    { title: "X", url: "https://x.com", icon: "x" },
    { title: "YouTube", url: "https://youtube.com", icon: "youtube" },
    { title: "Correo", url: "mailto:hello@example.com", icon: "mail" },
  ],
  footerText: "Gracias por pasar por aqui.",
  seo: {
    title: "Daniel Clavel | Links oficiales",
    description:
      "Todos mis enlaces oficiales en una pagina rapida, limpia y optimizada.",
    siteUrl: "https://example.com",
    ogImage: "/avatar.svg",
  },
};
