export type Tactic = "ugly-v1" | "dont-scale" | "sold-first" | "duct-tape-demo";

export const TACTIC_LABELS: Record<Tactic, string> = {
  "ugly-v1": "Ugly v1",
  "dont-scale": "Did things that don't scale",
  "sold-first": "Sold it before building it",
  "duct-tape-demo": "Duct-taped the demo",
};

export type Entry = {
  slug: string;
  name: string;
  kind: "famous" | "community";
  tactic: Tactic;
  thenImage: string; // path under /public, e.g. "/screenshots/craigslist-then.png"
  thenCaption?: string;
  thenYear: number;
  nowImage?: string; // absent => community card shows "Now: TBD — they just shipped"
  nowYear?: number;
  story: string; // 1–3 sentences, fact-checked
  sourceUrl?: string; // Wayback capture / interview / article backing the story
  founderName?: string; // community only
  founderLink?: string; // community only
  productUrl?: string; // community only
};

export const entries: Entry[] = [
  {
    slug: "craigslist",
    name: "Craigslist",
    kind: "famous",
    tactic: "ugly-v1",
    thenImage: "/screenshots/craigslist-then.png",
    thenYear: 1998,
    nowImage: "/screenshots/craigslist-now.png",
    nowYear: new Date().getFullYear(),
    story:
      "Craig Newmark started it in 1995 as a cc'd email list of San Francisco events. The website came later — and has barely changed since.",
    sourceUrl: "https://web.archive.org/web/19981202212015/http://www.craigslist.org/",
  },
];

export const famousEntries = entries.filter((e) => e.kind === "famous");
export const communityEntries = entries.filter((e) => e.kind === "community");
export const getEntry = (slug: string) => entries.find((e) => e.slug === slug);
