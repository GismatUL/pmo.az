/**
 * Base path the site is served under, e.g. "/pmo.az" on GitHub Pages
 * (https://<user>.github.io/pmo.az/). Empty when served from a domain root.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefixes root-relative asset URLs ("/images/x.jpg") with the base path. */
export function asset<T extends string | undefined>(src: T): T {
  return (src && src.startsWith("/") && !src.startsWith("//") ? `${BASE_PATH}${src}` : src) as T;
}
