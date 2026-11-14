// Post-build step: copies CMS media (http(s)://<backend>/storage/...) into the
// static export and rewrites the references, so the exported site does not
// depend on the Laravel server being reachable once it is deployed.
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const OUT = "out";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const MEDIA_URL = /https?:\/\/[^"'\s\\)<>]+?\/storage\/([^"'\s\\)<>?#]+)/g;

async function* files(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else if (/\.(html|txt|json)$/.test(entry.name)) yield path;
  }
}

const downloaded = new Map(); // remote URL -> local URL, or null when it failed

async function localize(url, rel) {
  if (downloaded.has(url)) return downloaded.get(url);
  let local = null;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const target = join(OUT, "storage", ...decodeURIComponent(rel).split("/"));
    await mkdir(dirname(target), { recursive: true });
    await writeFile(target, Buffer.from(await res.arrayBuffer()));
    local = `${BASE_PATH}/storage/${rel}`;
  } catch (e) {
    console.warn(`localize-media: kept remote ${url} (${e.message})`);
  }
  downloaded.set(url, local);
  return local;
}

let changed = 0;
for await (const file of files(OUT)) {
  const text = await readFile(file, "utf8");
  const matches = [...text.matchAll(MEDIA_URL)];
  if (!matches.length) continue;
  let next = text;
  for (const [url, rel] of matches) {
    const local = await localize(url, rel);
    if (local) next = next.split(url).join(local);
  }
  if (next !== text) {
    await writeFile(file, next);
    changed++;
  }
}

const ok = [...downloaded.values()].filter(Boolean).length;
console.log(`localize-media: ${ok}/${downloaded.size} media files copied, ${changed} pages rewritten`);
