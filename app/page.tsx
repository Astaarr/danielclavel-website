import Image from "next/image";
import { profileConfig } from "@/src/config/profile";
import { Icon } from "@/src/components/icons";
import { ThemeToggle } from "@/src/components/theme-toggle";
import { YouTubeSection } from "@/src/components/youtube-section";

export default function Home() {
  const { profile, socials, youtubeSectionTitle } = profileConfig;

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-6 h-64 w-64 rounded-full bg-amber-100/55 blur-3xl dark:bg-amber-900/20" />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-stone-200/45 blur-3xl dark:bg-stone-900/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_44%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.04),transparent_42%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.38),transparent_50%)]" />
      </div>

      <div className="mx-auto w-full max-w-[42rem] animate-[fadeUp_560ms_ease-out]">
        <header className="rounded-3xl border border-neutral-200/85 bg-white/85 p-6 shadow-[0_14px_36px_-26px_rgba(0,0,0,0.6)] backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/75 sm:p-8">
          <div className="mb-6 flex justify-end">
            <ThemeToggle />
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/80 ring-4 ring-neutral-100 dark:border-neutral-800 dark:ring-neutral-900/80">
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                fill
                className="object-cover"
                priority
                sizes="96px"
              />
            </div>

            <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-balance text-neutral-900 dark:text-neutral-50 sm:text-3xl">
              {profile.name}
            </h1>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-600 dark:text-neutral-300 sm:text-base">
              {profile.tagline}
            </p>
            {profile.contactEmail ? (
              <a
                href={`mailto:${profile.contactEmail}`}
                className="mt-2 text-sm text-neutral-500 underline-offset-4 transition hover:text-neutral-800 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)] dark:text-neutral-400 dark:hover:text-neutral-100"
              >
                {profile.contactEmail}
              </a>
            ) : null}

            <nav aria-label="Redes sociales" className="mt-5 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.title}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.title}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition hover:-translate-y-0.5 hover:border-neutral-400 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-neutral-100"
                >
                  <Icon name={social.icon} />
                </a>
              ))}
            </nav>
          </div>
        </header>

        <YouTubeSection title={youtubeSectionTitle} />
      </div>
    </main>
  );
}
