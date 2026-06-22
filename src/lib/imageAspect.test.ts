import { describe, expect, test } from "bun:test";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { DEFAULT_ASPECT, imageAspect } from "@/lib/imageAspect";

// Cross-check our header parser against `sips` (macOS) for the real screenshots.
function sipsDims(publicPath: string): { w: number; h: number } {
  const out = execFileSync("sips", [
    "-g",
    "pixelWidth",
    "-g",
    "pixelHeight",
    join(process.cwd(), "public", publicPath),
  ]).toString();
  const w = Number(out.match(/pixelWidth:\s*(\d+)/)?.[1]);
  const h = Number(out.match(/pixelHeight:\s*(\d+)/)?.[1]);
  return { w, h };
}

describe("imageAspect", () => {
  const cases = [
    "/screenshots/firestarters-then.jpg", // JPEG, wide
    "/screenshots/craigslist-then.png", // PNG, 4:3
    "/screenshots/strava-now-app-v2.jpg", // JPEG, ~2:1
  ];

  for (const p of cases) {
    test(`matches sips for ${p}`, () => {
      const { w, h } = sipsDims(p);
      expect(imageAspect(p)).toBeCloseTo(w / h, 4);
    });
  }

  test("falls back to default for a missing file", () => {
    expect(imageAspect("/screenshots/does-not-exist.png")).toBe(DEFAULT_ASPECT);
  });
});
