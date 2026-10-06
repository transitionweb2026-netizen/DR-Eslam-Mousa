// Post-build fix for static export on Windows.
//
// The client router requests per-segment prefetch files with every "/" of the
// segment path turned into ".", e.g. /en/about/__next.$d$locale.about.__PAGE__.txt
// (convertSegmentPathToStaticExportFilename in next/dist). On Windows, Next's
// exporter builds those paths with path.relative(), which returns "\" — only
// "/" is converted — so the files land nested instead, e.g.
// out/en/about/__next.$d$locale/about/__PAGE__.txt, and every prefetch 404s.
// Linux builds already produce the flat names, so this is a no-op there.
import { readdirSync, renameSync, rmSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";

const outDir = join(process.cwd(), "out");
let moved = 0;

function filesUnder(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = join(dir, entry.name);
    return entry.isDirectory() ? filesUnder(full) : [full];
  });
}

function walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = join(dir, entry.name);
    if (entry.name.startsWith("__next.")) {
      for (const file of filesUnder(full)) {
        const flatName = `${entry.name}.${relative(full, file).split(sep).join(".")}`;
        renameSync(file, join(dir, flatName));
        moved++;
      }
      rmSync(full, { recursive: true, force: true });
    } else {
      walk(full);
    }
  }
}

if (statSync(outDir, { throwIfNoEntry: false })?.isDirectory()) {
  walk(outDir);
  if (moved) console.log(`[export] flattened ${moved} segment prefetch file(s) to the paths the client router requests`);
}
