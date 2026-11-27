/**
 * SHARED — do not edit on section branches.
 *
 * Single agent server on port 8000. Every file in ./sections/<slug>.ts
 * default-exports the Express app the docs build with `createStrandsApp(...)`
 * (instead of calling `app.listen(8000)` itself). Each one is mounted at
 * `/<slug>`, so the frontend runtime for a section points its HttpAgent at
 * http://localhost:8000/<slug>.
 *
 * A section that needs extra agent endpoints can also export
 * `mounts: Record<string, Express>`; each is mounted at `/<slug>-<key>`.
 */
import express, { type Express } from "express";
import { readdirSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const PORT = 8000;
const sectionsDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "sections");

const root = express();
const mounted: string[] = [];

root.get("/", (_req, res) => {
  res.json({ status: "ok", agents: mounted });
});

const files = readdirSync(sectionsDir)
  .filter((f) => f.endsWith(".ts") && !f.startsWith("_"))
  .sort();

for (const file of files) {
  const slug = file.replace(/\.ts$/, "");
  try {
    const mod = (await import(pathToFileURL(path.join(sectionsDir, file)).href)) as {
      default?: Express;
      mounts?: Record<string, Express>;
    };
    if (mod.default) {
      root.use(`/${slug}`, mod.default);
      mounted.push(`/${slug}`);
    }
    for (const [key, app] of Object.entries(mod.mounts ?? {})) {
      root.use(`/${slug}-${key}`, app);
      mounted.push(`/${slug}-${key}`);
    }
  } catch (err) {
    // A section whose docs code is broken must not take the other sections down.
    console.error(`[agent] failed to load section "${slug}":`, err);
  }
}

root.listen(PORT, () => {
  console.log(`Agent server listening on http://localhost:${PORT}`);
  for (const m of mounted) console.log(`  http://localhost:${PORT}${m}`);
});
