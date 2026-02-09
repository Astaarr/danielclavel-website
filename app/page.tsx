import Image from "next/image";
import { profileConfig } from "@/src/config/profile";
import { LinkButton } from "@/src/components/link-button";
import { Icon } from "@/src/components/icons";
import { ThemeToggle } from "@/src/components/theme-toggle";

export default function Home() {
  const { profile, links, featured, socials, footerText } = profileConfig;

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-sky-200/45 blur-3xl dark:bg-sky-900/35" />
        <div className="absolute -right-16 bottom-12 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl dark:bg-emerald-900/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.9),transparent_40%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.02),transparent_35%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_30%),radial-gradient(circle_at_bottom,rgba(0,0,0,0.3),transparent_45%)]" />
      </div>

      <div className="mx-auto w-full max-w-[34rem] animate-[fadeUp_560ms_ease-out]">
        <header className="rounded-3xl border border-neutral-200/75 bg-white/80 p-5 shadow-[0_12px_34px_-22px_rgba(0,0,0,0.38)] backdrop-blur-xl dark:border-neutral-800 dark:bg-neutral-950/65 sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-neutral-300/80 bg-white px-3 py-1 text-xs text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Disponible para colaboraciones
            </div>
            <ThemeToggle />
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border border-white/70 ring-4 ring-sky-50 dark:border-neutral-800 dark:ring-neutral-900/70">
              <div className="absolute inset-0 bg-linear-to-br from-sky-300/25 to-emerald-200/25 dark:from-sky-700/15 dark:to-emerald-700/15" />
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
            {profile.location ? (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
                <Icon name="map-pin" className="h-4 w-4" />
                {profile.location}
              </p>
            ) : null}
          </div>
        </header>

        {featured ? (
          <section className="mt-5">
            <div className="rounded-3xl border border-sky-200/80 bg-linear-to-r from-sky-100/80 to-emerald-100/80 p-1 shadow-[0_12px_34px_-24px_rgba(2,132,199,0.65)] dark:border-sky-800/70 dark:from-sky-950/45 dark:to-emerald-950/35">
              <LinkButton
                slug="featured"
                title={featured.title}
                description={featured.description}
                url={featured.url}
                icon={featured.icon}
                variant="glass"
              />
            </div>
          </section>
        ) : null}

        <section className="mt-4 grid gap-3 sm:gap-3.5" aria-label="Enlaces principales">
          {links.map((link, index) => (
            <div
              key={link.slug}
              className="animate-[fadeUp_480ms_ease-out]"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <LinkButton
                slug={link.slug}
                title={link.title}
                url={link.url}
                icon={link.icon}
                description={link.description}
                variant={link.styleVariant}
              />
            </div>
          ))}
        </section>

        <footer className="mt-8 rounded-2xl border border-neutral-200/70 bg-white/70 px-4 py-5 text-center backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/60 sm:px-5">
          <nav aria-label="Redes sociales" className="flex justify-center gap-2 sm:gap-3">
            {socials.map((social) => (
              <a
                key={social.title}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.title}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-700 transition hover:-translate-y-0.5 hover:border-neutral-400 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)] dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-neutral-100"
              >
                <Icon name={social.icon} />
              </a>
            ))}
          </nav>
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            {footerText ?? `© ${new Date().getFullYear()} ${profile.name}`}
          </p>
        </footer>
      </div>
    </main>
  );
}
