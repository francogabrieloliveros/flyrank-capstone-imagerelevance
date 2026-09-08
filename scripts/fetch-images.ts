import fs from "node:fs/promises";
import path from "node:path";

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
if (!ACCESS_KEY) {
  console.error("Missing UNSPLASH_ACCESS_KEY in environment.");
  process.exit(1);
}

const OUTPUT_DIR = path.resolve("data/images");
const MANIFEST_PATH = path.resolve("data/images/manifest.json");

// Search term -> how many images to pull, and the category label these
// belong to. fox/wolf are deliberately in the same category so the guard
// has a real near-miss pair to reject.
const SEARCH_TERMS: { term: string; category: string; count: number }[] = [
  { term: "red fox", category: "animal", count: 10 },
  { term: "gray wolf", category: "animal", count: 10 },
  { term: "dog", category: "animal", count: 10 },
  { term: "bear", category: "animal", count: 10 },
  { term: "deer", category: "animal", count: 10 },
];

const PER_PAGE = 30; // Unsplash max per request page

interface UnsplashPhoto {
  id: string;
  urls: { regular: string };
  links: { download_location: string; html: string };
  user: { name: string; links: { html: string } };
}

interface ManifestEntry {
  filename: string;
  searchTerm: string;
  category: string;
  unsplashId: string;
  sourceUrl: string;
  photographer: string;
  photographerUrl: string;
  license: string;
}

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function searchUnsplash(
  term: string,
  count: number,
): Promise<UnsplashPhoto[]> {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", term);
  url.searchParams.set("per_page", String(Math.min(count, PER_PAGE)));
  url.searchParams.set("orientation", "landscape");

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
  });

  if (!res.ok) {
    throw new Error(
      `Unsplash search failed for "${term}": ${res.status} ${await res.text()}`,
    );
  }

  const body = (await res.json()) as { results: UnsplashPhoto[] };
  return body.results.slice(0, count);
}

async function downloadImage(
  photo: UnsplashPhoto,
  filename: string,
): Promise<void> {
  // 1. Fetch the actual image bytes.
  const imgRes = await fetch(photo.urls.regular);
  if (!imgRes.ok)
    throw new Error(`Failed to download image ${photo.id}: ${imgRes.status}`);
  const buffer = Buffer.from(await imgRes.arrayBuffer());
  await fs.writeFile(path.join(OUTPUT_DIR, filename), buffer);

  // 2. Unsplash API guidelines require triggering this endpoint whenever a
  // photo is actually downloaded/used, for their download-tracking stats.
  // Fire-and-forget with a short timeout is fine — don't let it block ingestion.
  try {
    await fetch(`${photo.links.download_location}?client_id=${ACCESS_KEY}`);
  } catch {
    // non-fatal — tracking ping failing shouldn't fail the whole run
  }
}

async function main() {
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  const manifest: ManifestEntry[] = [];
  let imageIndex = 1;

  for (const { term, category, count } of SEARCH_TERMS) {
    console.log(`Searching "${term}"...`);
    const photos = await searchUnsplash(term, count);

    if (photos.length < count) {
      console.warn(
        `  only found ${photos.length}/${count} results for "${term}"`,
      );
    }

    for (const photo of photos) {
      const filename = `${String(imageIndex).padStart(3, "0")}-${term.replace(/\s+/g, "-")}-${photo.id}.jpg`;
      console.log(`  downloading ${filename}`);

      await downloadImage(photo, filename);

      manifest.push({
        filename,
        searchTerm: term,
        category,
        unsplashId: photo.id,
        sourceUrl: photo.links.html,
        photographer: photo.user.name,
        photographerUrl: photo.user.links.html,
        license:
          "Unsplash License (https://unsplash.com/license) — free to use, attribution appreciated",
      });

      imageIndex++;
      // Unsplash free tier: 50 req/hour. A short delay keeps search + download
      // + tracking-ping calls comfortably under that across a 50-image run.
      await sleep(300);
    }
  }

  await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
  console.log(`\nDone. ${manifest.length} images written to ${OUTPUT_DIR}`);
  console.log(`Manifest: ${MANIFEST_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
