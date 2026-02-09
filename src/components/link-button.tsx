"use client";

import { Icon } from "@/src/components/icons";
import type { IconName, LinkVariant } from "@/src/config/profile";

type LinkButtonProps = {
  slug: string;
  title: string;
  url: string;
  icon?: IconName;
  description?: string;
  variant?: LinkVariant;
};

const variantClasses: Record<LinkVariant, string> = {
  primary:
    "border border-neutral-900 bg-neutral-900 text-white shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)] hover:bg-neutral-800 dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-white",
  subtle:
    "border border-neutral-300 bg-white/80 text-neutral-900 shadow-sm hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/70 dark:text-neutral-100 dark:hover:bg-neutral-900",
  glass:
    "border border-white/60 bg-white/55 text-neutral-900 shadow-[0_8px_20px_-16px_rgba(0,0,0,0.65)] backdrop-blur-xl hover:bg-white/75 dark:border-neutral-700/70 dark:bg-neutral-900/55 dark:text-neutral-100 dark:hover:bg-neutral-900/75",
  gradient:
    "border border-sky-300/60 bg-linear-to-r from-sky-200/80 via-cyan-100 to-emerald-100 text-neutral-900 shadow-[0_8px_22px_-14px_rgba(2,132,199,0.5)] hover:from-sky-200 hover:to-emerald-100 dark:border-sky-600/50 dark:from-sky-900/50 dark:via-cyan-900/35 dark:to-emerald-900/35 dark:text-neutral-100",
};

export function LinkButton({
  slug,
  title,
  url,
  icon,
  description,
  variant = "subtle",
}: LinkButtonProps) {
  const onClick = async () => {
    try {
      await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
        keepalive: true,
      });
    } catch {
      // Best effort tracking.
    } finally {
      window.location.assign(url);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-2xl px-4 py-4 text-left transition duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)] ${variantClasses[variant]}`}
      aria-label={description ? `${title}: ${description}` : title}
    >
      <span className="flex items-center gap-3">
        {icon ? (
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/5 text-neutral-700 transition group-hover:bg-black/10 dark:bg-white/10 dark:text-neutral-200 dark:group-hover:bg-white/15">
            <Icon name={icon} className="h-4 w-4" />
          </span>
        ) : null}
        <span className="min-w-0">
          <span className="block truncate text-base font-semibold tracking-tight">
            {title}
          </span>
          {description ? (
            <span className="block text-sm text-neutral-600 dark:text-neutral-300">
              {description}
            </span>
          ) : null}
        </span>
        <span
          aria-hidden="true"
          className="ml-auto text-lg text-neutral-500 transition group-hover:translate-x-0.5 dark:text-neutral-400"
        >
          →
        </span>
      </span>
    </button>
  );
}
