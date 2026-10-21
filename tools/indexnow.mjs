#!/usr/bin/env node
/*
  Ask Bing to recrawl this site now instead of on its own schedule.

  Bing is the engine this site cares about, and it crawls a small personal site
  whenever it gets around to it, which is how the pixel portfolio stayed in
  results for weeks after the newer page took over. IndexNow is the one channel
  that says "look again" and gets read the same day.

  The key is not a secret. The file at /<key>.txt is the proof that whoever
  submits URLs for this host can write to it, so the file is public, committed,
  and named by the key itself.

  Usage:
      npm run indexnow
      npm run indexnow -- https://another-host.example/page

  The sitemap is sent for this site. Extra URLs are grouped by host and sent in
  their own request, because one request belongs to one host. Every host has to
  serve the same key file at /<key>.txt first, which is why a copy sits in the
  pixel portfolio too.

  Exits 1 when a submission is rejected, 2 when the local key file is not
  usable. No dependencies, Node 18 or newer for global fetch.
*/
import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const HOST = "houtaroudes-myportfolio.vercel.app";
const ORIGIN = `https://${HOST}`;

const keyFile = readdirSync(join(root, "public")).find((name) => /^[a-f0-9]{32}\.txt$/.test(name));
if (!keyFile) {
  console.error("No IndexNow key file in public/. Expected a 32 character hex name ending in .txt.");
  process.exit(2);
}

const key = keyFile.replace(/\.txt$/, "");
const served = readFileSync(join(root, "public", keyFile), "utf8").trim();
if (served !== key) {
  console.error(`public/${keyFile} says ${JSON.stringify(served)}, which is not the key in its name.`);
  process.exit(2);
}

/* The sitemap is the list of pages worth announcing, so it is also the list
   sent here: one file to update when a URL is added. */
const sitemap = readFileSync(join(root, "public", "sitemap.xml"), "utf8");
const listed = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
if (!listed.length) listed.push(`${ORIGIN}/`);

const byHost = new Map();
for (const raw of [...listed, ...process.argv.slice(2)]) {
  const url = new URL(raw);
  if (!byHost.has(url.host)) byHost.set(url.host, []);
  const list = byHost.get(url.host);
  if (!list.includes(url.href)) list.push(url.href);
}

let rejected = 0;
for (const [host, urlList] of byHost) {
  console.log(`Submitting ${urlList.length} URL(s) for ${host}`);
  for (const url of urlList) console.log(`  ${url}`);

  let res;
  try {
    res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host, key, keyLocation: `https://${host}/${keyFile}`, urlList }),
      signal: AbortSignal.timeout(20000),
    });
  } catch (err) {
    console.error(`  could not reach IndexNow: ${err.message}`);
    rejected++;
    continue;
  }

  if (res.ok) {
    console.log(`  accepted (HTTP ${res.status})`);
  } else {
    console.error(`  rejected (HTTP ${res.status}): ${(await res.text()).slice(0, 300)}`);
    rejected++;
  }
}

if (rejected) {
  console.error(`${rejected} of ${byHost.size} submission(s) failed.`);
  process.exit(1);
}
console.log("Bing and the rest of the IndexNow network read this endpoint.");
