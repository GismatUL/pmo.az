/** Minimal loader for the Cloudflare Turnstile captcha script. */

type RenderOptions = {
  sitekey: string;
  appearance?: "always" | "execute" | "interaction-only";
  theme?: "light" | "dark" | "auto";
  "response-field"?: boolean;
  callback?: (token: string) => void;
  "expired-callback"?: () => void;
  "error-callback"?: () => void;
  "before-interactive-callback"?: () => void;
  "after-interactive-callback"?: () => void;
};

export type TurnstileApi = {
  render: (el: HTMLElement, options: RenderOptions) => string;
  reset: (id: string) => void;
  remove: (id: string) => void;
  getResponse: (id: string) => string | undefined;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
let loading: Promise<TurnstileApi> | null = null;

export function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  if (loading) return loading;

  loading = new Promise<TurnstileApi>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = SRC;
    script.async = true;
    script.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("turnstile")));
    script.onerror = () => {
      loading = null;
      script.remove();
      reject(new Error("turnstile"));
    };
    document.head.appendChild(script);
  });

  return loading;
}
