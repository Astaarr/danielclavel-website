import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { profileConfig } from "@/src/config/profile";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const seo = profileConfig.seo;
const metadataBase = seo?.siteUrl ? new URL(seo.siteUrl) : undefined;
const title = seo?.title ?? `${profileConfig.profile.name} | Bio page`;
const description =
  seo?.description ??
  `${profileConfig.profile.name} - enlaces y redes oficiales en un solo lugar.`;
const siteName = seo?.siteName ?? profileConfig.profile.name;
const ogUrl = seo?.siteUrl ?? undefined;
const ogImage = seo?.ogImage ?? "/avatar.png";

export const metadata: Metadata = {
  metadataBase,
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName,
    url: ogUrl,
    images: [ogImage],
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  icons: {
    icon: "/avatar.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased`}>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => {
              try {
                const saved = localStorage.getItem('bio-theme');
                const theme = saved === 'dark' || saved === 'light'
                  ? saved
                  : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.dataset.theme = theme;
              } catch {
                document.documentElement.dataset.theme = 'light';
              }
            })();`,
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
