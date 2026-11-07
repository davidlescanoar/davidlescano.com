// Fails fast with a clear message when the wrong Node version is active.
// Older Node versions break inside Tailwind's build step with a confusing
// "require() of ES Module" error instead.
import { readFileSync } from "node:fs";

const required = Number(readFileSync(new URL("../.nvmrc", import.meta.url), "utf8").trim());
const current = Number(process.versions.node.split(".")[0]);

if (current < required) {
  console.error(
    `\nThis project needs Node ${required}, but Node ${process.versions.node} is active.\n` +
      `Run \`nvm use\` in this folder (or \`nvm alias default ${required}\` to make it the default), then try again.\n`,
  );
  process.exit(1);
}
