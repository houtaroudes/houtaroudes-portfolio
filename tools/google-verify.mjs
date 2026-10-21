#!/usr/bin/env node
/*
  Put a Google Search Console verification file into public/.

  Google names the file after the token, unlike Bing, which always calls it
  BingSiteAuth.xml. So this takes either the file Google gave you or just the
  token out of its name, and writes the one line Search Console looks for:

      google-site-verification: google<token>.html

  Usage:
      npm run google -- ~/Downloads/google1a2b3c4d5e6f.html
      npm run google -- 1a2b3c4d5e6f

  Exits 2 when the file or token is not shaped like a Google one, 1 when the
  argument names something that is not there. No dependencies.
*/
import { copyFileSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { basename, dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");
const TOKEN = /^[A-Za-z0-9_-]{8,64}$/;

function fail(message) {
  console.error(message);
  process.exit(2);
}

const arg = process.argv[2]?.trim();
if (!arg) {
  fail("Pass the file Google gave you, or the token out of its name:\n  npm run google -- google1a2b3c4d5e6f.html");
}

let token;
let source = null;

if (existsSync(arg)) {
  source = arg;
  const content = readFileSync(arg, "utf8");
  const named = basename(arg).match(/^google([A-Za-z0-9_-]+)\.html$/i);
  const claimed = content.match(/google-site-verification:\s*google([A-Za-z0-9_-]+)\.html/i);
  if (!named) fail(`${basename(arg)} is not one of Google's files. They are named google<token>.html.`);
  if (!claimed) fail(`${basename(arg)} does not contain the google-site-verification line Search Console looks for.`);
  /* The name and the line inside have to agree, or the file verifies nothing;
     the line is the one Google reads, so it wins. */
  if (named[1] !== claimed[1]) {
    console.error(`The name says ${named[1]} and the line inside says ${claimed[1]}. Using the line inside.`);
  }
  token = claimed[1];
} else {
  token = arg.replace(/^google/i, "").replace(/\.html$/i, "");
  if (!TOKEN.test(token)) {
    fail(`${JSON.stringify(arg)} does not look like a Google token. Expected 8 to 64 letters, digits, dashes or underscores.`);
  }
}

const target = join(publicDir, `google${token}.html`);
if (source) copyFileSync(source, target);
else writeFileSync(target, `google-site-verification: google${token}.html\n`);

console.log(`Wrote public/google${token}.html`);
console.log("Deploy, then press Verify in Search Console.");
console.log(`The file must answer 200 at https://houtaroudes-myportfolio.vercel.app/google${token}.html`);
