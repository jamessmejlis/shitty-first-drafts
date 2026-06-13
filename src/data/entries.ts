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

  // Optional rich content for the entry detail page (the design's full layout).
  // When absent, the detail page degrades gracefully to the single `story`.
  lead?: string; // italic lead sentence under the title
  body?: { lead: string; text: string }[]; // labelled paragraphs ("The ugly part." …)
  fileStats?: { label: string; value: string }[]; // "The file" key/value rows
  tactics?: Tactic[]; // multiple tactics (defaults to [tactic])
  lesson?: string; // italic "The lesson:" note
  featuredCard?: { before: string; now: string }; // home featured-card blurb
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
  {
    slug: "google",
    name: "Google",
    kind: "famous",
    tactic: "ugly-v1",
    thenImage: "/screenshots/google-then.png",
    thenYear: 1998,
    nowImage: "/screenshots/google-now.png",
    nowYear: new Date().getFullYear(),
    story:
      "Began as a Stanford research project called BackRub. The famously bare 1998 homepage stayed bare partly because the founders didn't do fancy HTML.",
    sourceUrl: "https://web.archive.org/web/19981202230410/http://www.google.com/",
  },
  {
    slug: "amazon",
    name: "Amazon",
    kind: "famous",
    tactic: "ugly-v1",
    thenImage: "/screenshots/amazon-then.png",
    thenYear: 1999,
    nowImage: "/screenshots/amazon-now.png",
    nowYear: new Date().getFullYear(),
    story:
      "Launched in 1995 selling only books, run out of Jeff Bezos's garage. A bell rang for every order — within weeks it rang so often they switched it off.",
    sourceUrl: "https://web.archive.org/web/19990828014913/http://www.amazon.com/",
  },
  {
    slug: "airbnb",
    name: "Airbnb",
    kind: "famous",
    tactic: "dont-scale",
    thenImage: "/screenshots/airbnb-then.png",
    thenCaption: "AirBed & Breakfast, before the name fit on a cereal box.",
    thenYear: 2008,
    nowImage: "/screenshots/airbnb-now.png",
    nowYear: new Date().getFullYear(),
    story:
      "When listings looked bad, the founders flew to New York and photographed hosts' apartments themselves — and funded the company selling $40 election-themed cereal boxes.",
    sourceUrl: "https://web.archive.org/web/20081219124926/http://airbedandbreakfast.com/",
    lead: "Three guys who couldn't make rent put air mattresses on their floor — and a craigslist clone online to fill them.",
    body: [
      {
        lead: "The ugly part.",
        text: "A one-page site cloned from craigslist. Grey placeholder photos, no map, no payments, no reviews. To book, you emailed the host and hoped they were real. The founders funded it selling novelty cereal door to door.",
      },
      {
        lead: "What they shipped anyway.",
        text: "They charged real money before any of it worked. Three guests, two weeks of rent covered — enough signal to keep building the parts they'd faked.",
      },
      {
        lead: "Now.",
        text: "A public company worth roughly $90B, hosting more than 5 million stays a night across 220+ countries.",
      },
    ],
    fileStats: [
      { label: "Founded", value: "2008" },
      { label: "Time to first $", value: "~2 weeks" },
      { label: "Day-one stack", value: "HTML + email" },
    ],
    tactics: ["ugly-v1", "dont-scale", "sold-first"],
    lesson:
      "Charge before it's ready. Three strangers on air mattresses was enough proof.",
    featuredCard: {
      before:
        "three air mattresses on a stranger's floor, breakfast included, booked over email.",
      now: "a public company worth ~$90B, 5M+ stays a night.",
    },
  },
  {
    slug: "dropbox",
    name: "Dropbox",
    kind: "famous",
    tactic: "duct-tape-demo",
    thenImage: "/screenshots/dropbox-then.png",
    thenCaption: "Before this site existed, the MVP was a narrated demo video.",
    thenYear: 2009,
    nowImage: "/screenshots/dropbox-now.png",
    nowYear: new Date().getFullYear(),
    story:
      "Before the product worked at scale, Drew Houston shipped a 3-minute screencast demo tuned for Digg readers. The waiting list jumped from 5,000 to 75,000 overnight.",
    sourceUrl: "https://web.archive.org/web/20090101231252/http://getdropbox.com/",
  },
];

export const famousEntries = entries.filter((e) => e.kind === "famous");
export const communityEntries = entries.filter((e) => e.kind === "community");
export const getEntry = (slug: string) => entries.find((e) => e.slug === slug);

// The entry the home page leads with (hero before/after + featured card).
export const FEATURED_SLUG = "airbnb";
export const featuredEntry = getEntry(FEATURED_SLUG) ?? famousEntries[0] ?? entries[0];

// 1-based catalog position, used for the honest "no. N" labels.
export const entryNumber = (slug: string) => entries.findIndex((e) => e.slug === slug) + 1;

// Display order for the "Browse by tactic" list (matches the four house tactics).
export const TACTIC_ORDER: Tactic[] = ["ugly-v1", "dont-scale", "sold-first", "duct-tape-demo"];

export const tacticCount = (t: Tactic) => entries.filter((e) => e.tactic === t).length;

export const firstEntryWithTactic = (t: Tactic) => entries.find((e) => e.tactic === t);
