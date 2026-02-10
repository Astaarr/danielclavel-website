"use client";

const STORAGE_KEY = "bio-theme";

export function ThemeToggle() {
  const toggleTheme = () => {
    const current = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300/70 bg-white/80 text-neutral-700 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-bg)] dark:border-neutral-700 dark:bg-neutral-900/75 dark:text-neutral-200 dark:hover:bg-neutral-900"
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      <span className="sr-only">Cambiar tema</span>
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 transition group-hover:rotate-12"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M12 3.2a1 1 0 0 1 1 1v1.6a1 1 0 1 1-2 0V4.2a1 1 0 0 1 1-1m0 15a1 1 0 0 1 1 1v1.6a1 1 0 0 1-2 0v-1.6a1 1 0 0 1 1-1m-8.8-7.2H4.8a1 1 0 0 1 0 2H3.2a1 1 0 0 1 0-2M19.2 11h1.6a1 1 0 1 1 0 2h-1.6a1 1 0 0 1 0-2M6.4 5.8a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 1 1-1.4 1.4L6.4 7.2a1 1 0 0 1 0-1.4m9.7 9.7a1 1 0 0 1 1.4 0l1.1 1.1a1 1 0 1 1-1.4 1.4l-1.1-1.1a1 1 0 0 1 0-1.4M18.6 5.8a1 1 0 0 1 0 1.4l-1.1 1.1a1 1 0 0 1-1.4-1.4l1.1-1.1a1 1 0 0 1 1.4 0m-9.7 9.7a1 1 0 0 1 0 1.4l-1.1 1.1a1 1 0 1 1-1.4-1.4l1.1-1.1a1 1 0 0 1 1.4 0M12 7a5 5 0 1 1-5 5 5 5 0 0 1 5-5"
        />
      </svg>
    </button>
  );
}
