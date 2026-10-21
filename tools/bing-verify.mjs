#!/usr/bin/env node
/*
  Put the Bing Webmaster Tools verification code into public/BingSiteAuth.xml.

  Bing hands each account its own code when a site is added (Add site, then the
  XML file option), and the file has to sit at the site root with that code
  inside it. The code is not a secret: it is served publicly, and its only job is
  to prove that whoever put it there can write to the deployed site. It cannot be
  generated here, because it belongs to the account.

  Usage:
      npm run bing -- A1B2C3D4E5F6G7H8
      npm run bing            prints the code currently in the file

  Exits 2 on something that cannot be a Bing code, 1 when there is none yet.
  No dependencies.
*/
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const file = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "BingSiteAuth.xml");
const PLACEHOLDER = "PASTE-YOUR-BING-TOKEN-HERE";

/* The same four lines Bing hands out, with no commentary added: a verification
   file is not the place for a note explaining itself, and the explanation
   belongs here in the tool that writes it. */
const template = (code) => `<?xml version="1.0"?>
<users>
\t<user>${code}</user>
</users>
`;

function current() {
  try {
    return (readFileSync(file, "utf8").match(/<user>([^<]*)<\/user>/) || [])[1]?.trim() || null;
  } catch {
    return null;
  }
}

const arg = process.argv[2]?.trim();

if (!arg) {
  const code = current();
  if (!code || code === PLACEHOLDER) {
    console.error("No Bing verification code yet. Get one from Bing Webmaster Tools (Add site, XML file), then:");
    console.error("  npm run bing -- YOUR_CODE");
    process.exit(1);
  }
  console.log(`public/BingSiteAuth.xml carries ${code}`);
  console.log("Check it at https://houtaroudes-myportfolio.vercel.app/BingSiteAuth.xml after the next deploy.");
  process.exit(0);
}

/* Bing codes are short alphanumeric strings. Anything with a space, a quote or
   a tag in it would break the XML instead of verifying, so it is refused here
   rather than discovered after a deploy. */
if (!/^[A-Za-z0-9]{16,64}$/.test(arg)) {
  console.error(`${JSON.stringify(arg)} is not shaped like a Bing code. Expected 16 to 64 letters and digits.`);
  process.exit(2);
}

writeFileSync(file, template(arg));
console.log(`Wrote ${arg} to public/BingSiteAuth.xml`);
console.log("Now deploy the site, then press Verify in Bing Webmaster Tools.");
console.log("The file must answer 200 at https://houtaroudes-myportfolio.vercel.app/BingSiteAuth.xml");
