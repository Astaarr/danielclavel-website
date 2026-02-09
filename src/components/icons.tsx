import type { IconName } from "@/src/config/profile";

type IconProps = {
  name: IconName;
  className?: string;
};

const base = "h-5 w-5";

export function Icon({ name, className }: IconProps) {
  const cls = className ?? base;

  switch (name) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="M23.5 7.2a3 3 0 0 0-2.1-2.1C19.6 4.6 12 4.6 12 4.6s-7.6 0-9.4.5A3 3 0 0 0 .5 7.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 4.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-4.8M9.6 15.1V8.9L15.9 12z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m0 1.8A4 4 0 0 0 3.8 7.8v8.4a4 4 0 0 0 4 4h8.4a4 4 0 0 0 4-4V7.8a4 4 0 0 0-4-4zM18 6.4a1.2 1.2 0 1 1-1.2 1.2A1.2 1.2 0 0 1 18 6.4M12 7a5 5 0 1 1-5 5 5 5 0 0 1 5-5m0 1.8A3.2 3.2 0 1 0 15.2 12 3.2 3.2 0 0 0 12 8.8"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="M16.6 3c.3 2 1.4 3.5 3.4 4.3v2.8a9 9 0 0 1-3.2-.9v5.4a6.2 6.2 0 1 1-5.4-6.1v2.9a3.3 3.3 0 1 0 2.5 3.2V3z"
          />
        </svg>
      );
    case "twitch":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="M2 2h20v13l-4 4h-4l-3 3h-3v-3H2zm18 11V4H4v12h5v3l3-3h5zm-9-7h2v5h-2zm5 0h2v5h-2z"
          />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="M18.9 2H22l-6.8 7.7L23 22h-6.1l-4.8-6.5L6.4 22H3.3l7.3-8.3L1 2h6.3L11.6 8zM17.8 20h1.7L6.4 3.9H4.6z"
          />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.6v-2.2c-3.2.7-3.9-1.4-3.9-1.4a3.1 3.1 0 0 0-1.3-1.7c-1-.6.1-.6.1-.6a2.4 2.4 0 0 1 1.8 1.2 2.5 2.5 0 0 0 3.4 1 2.5 2.5 0 0 1 .8-1.6c-2.6-.3-5.3-1.3-5.3-5.8a4.5 4.5 0 0 1 1.2-3.1 4.2 4.2 0 0 1 .1-3s1-.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2a4.2 4.2 0 0 1 .1 3 4.5 4.5 0 0 1 1.2 3.1c0 4.5-2.7 5.5-5.3 5.8a2.8 2.8 0 0 1 .8 2.1v3.1c0 .4.2.7.8.6A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5"
          />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="M4.7 3A1.7 1.7 0 1 1 3 4.7 1.7 1.7 0 0 1 4.7 3M3.2 8.4h3V21h-3zM9 8.4h2.8v1.7h.1a3.1 3.1 0 0 1 2.8-1.9c3 0 3.6 2 3.6 4.6V21h-3v-6.4c0-1.5 0-3.5-2.1-3.5s-2.5 1.7-2.5 3.4V21H9z"
          />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2m0 2v.5l9 5.5 9-5.5V7l-9 5.5z"
          />
        </svg>
      );
    case "map-pin":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7m0 9.3A2.3 2.3 0 1 1 14.3 9 2.3 2.3 0 0 1 12 11.3"
          />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="m12 2.5 2.9 5.9 6.5 1-4.7 4.6 1.1 6.5L12 17.4l-5.8 3.1 1.1-6.5L2.6 9.4l6.5-1z"
          />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="m12 2 2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4zm-7 15 1.2 2.8L9 21l-2.8 1.2L5 25l-1.2-2.8L1 21l2.8-1.2z"
          />
        </svg>
      );
    case "globe":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={cls}>
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m7.9 9h-3.1a15.3 15.3 0 0 0-1.2-5A8.1 8.1 0 0 1 19.9 11M12 4.1A13.5 13.5 0 0 1 14.8 11H9.2A13.5 13.5 0 0 1 12 4.1M8.4 6A15.3 15.3 0 0 0 7.2 11H4.1A8.1 8.1 0 0 1 8.4 6M4.1 13h3.1a15.3 15.3 0 0 0 1.2 5A8.1 8.1 0 0 1 4.1 13M12 19.9A13.5 13.5 0 0 1 9.2 13h5.6A13.5 13.5 0 0 1 12 19.9m3.6-1.9a15.3 15.3 0 0 0 1.2-5h3.1a8.1 8.1 0 0 1-4.3 5"
          />
        </svg>
      );
    default:
      return null;
  }
}
