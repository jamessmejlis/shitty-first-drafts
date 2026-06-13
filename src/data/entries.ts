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
  {
    slug: "amigo-ai",
    name: "Amigo AI",
    kind: "famous",
    tactic: "duct-tape-demo",
    thenImage: "/screenshots/amigo-ai-then.png",
    thenCaption: "youramigo.ai — a 'clone yourself' waitlist, before any product existed.",
    thenYear: 2024,
    nowImage: "/screenshots/amigo-ai-now.png",
    nowYear: new Date().getFullYear(),
    story:
      "To sell an AI product that didn't exist, Ali Khokhar grabbed a coach's voice off YouTube, cloned it with ElevenLabs, and stitched a scripted demo together in Sony Vegas Pro. \"I got $12,000 in revenue,\" he said, \"and I have not written a single line of code.\"",
    sourceUrl:
      "https://pmfshow.buzzsprout.com/1889238/episodes/19285585-he-churned-100-of-his-revenue-on-purpose-then-grew-10x-to-2m-arr-in-under-12-months-ali-khokhar-founder-of-amigo-ai",
    founderName: "Ali Khokhar",
    founderLink: "https://www.linkedin.com/in/khokharali",
    productUrl: "https://www.amigo.ai",
    lead: "He hadn't written a line of code — so he faked the entire product in a video editor.",
    body: [
      {
        lead: "The ugly part.",
        text: "There was no product, just a waitlist. To land buyers, Khokhar pulled a coaching organization's head coach's voice off YouTube, cloned it with ElevenLabs, had an engineer mock up a single system prompt, and stitched the snippets into a polished demo video in Sony Vegas Pro.",
      },
      {
        lead: "What they shipped anyway.",
        text: "He sent the fake demo out and closed money on it — an enterprise contract plus four solopreneurs paying $500 each. $12,000 in revenue before a single line of code existed.",
      },
      {
        lead: "Now.",
        text: "Amigo has since pivoted to AI agents for healthcare and raised venture funding to build the real thing.",
      },
    ],
    fileStats: [
      { label: "Founded", value: "2024" },
      { label: "Revenue before code", value: "$12,000" },
      { label: "Day-one stack", value: "ElevenLabs + Sony Vegas" },
    ],
    tactics: ["duct-tape-demo", "sold-first"],
    lesson: "A convincing fake is a real test. Sell the promise first, then go build it.",
  },
  {
    slug: "butcherbox",
    name: "ButcherBox",
    kind: "famous",
    tactic: "sold-first",
    thenImage: "/screenshots/butcherbox-then.jpg",
    thenCaption: "The 2015 Kickstarter — pre-sold before a single box shipped.",
    thenYear: 2015,
    nowImage: "/screenshots/butcherbox-now.jpg",
    nowYear: new Date().getFullYear(),
    story:
      "Mike Salguero pre-sold ButcherBox on Kickstarter before building any of it. He set out to raise $25,000 and pulled in more than $210,000 from 1,155 backers — funding the whole operation with customers' money instead of a VC's.",
    sourceUrl:
      "https://pmfshow.buzzsprout.com/1889238/episodes/16736014-he-raised-30m-failed-then-raised-0-grew-to-550m-in-revenue-here-s-what-he-learned-mike-salguero-founder-of-butcherbox",
    founderName: "Mike Salguero",
    founderLink: "https://www.linkedin.com/in/mikesalguero/",
    productUrl: "https://www.butcherbox.com",
    lead: "He sold the boxes before he had a way to ship them.",
    body: [
      {
        lead: "The ugly part.",
        text: "No inventory, no warehouse, no supply chain — just a Kickstarter page promising grass-fed meat at your door. He'd already raised $30M and failed at a previous company; this time he put up $10,000 of his own and let pre-orders fund the rest.",
      },
      {
        lead: "What they shipped anyway.",
        text: "The campaign almost doubled its $25,000 goal on day one and closed at more than $210,000 from 1,155 backers — the most-funded food project Kickstarter had seen out of Massachusetts. Only then did he build the fulfilment behind it.",
      },
      {
        lead: "Now.",
        text: "A bootstrapped meat-subscription business that's grown past $550M in revenue, with no venture capital.",
      },
    ],
    fileStats: [
      { label: "Founded", value: "2015" },
      { label: "Kickstarter goal", value: "$25,000" },
      { label: "Pre-sold", value: "$210K+ / 1,155 backers" },
    ],
    lesson: "If people pay before it exists, you've found demand — not just interest.",
  },
  {
    slug: "spot-and-tango",
    name: "Spot & Tango",
    kind: "famous",
    tactic: "dont-scale",
    thenImage: "/screenshots/spot-and-tango-then.png",
    thenCaption: "spotandtango.com, 2019 — fresh dog food, cooked and delivered by hand.",
    thenYear: 2019,
    nowImage: "/screenshots/spot-and-tango-now.jpg",
    nowYear: new Date().getFullYear(),
    story:
      "Russell Breuer left private equity to cook fresh dog food by hand in a rented kitchen. \"I'll wake up at five o'clock in the morning,\" he said. \"I'll take the subway. I'll drop them off on her doorstep.\" That was the delivery network.",
    sourceUrl:
      "https://pmfshow.buzzsprout.com/1889238/episodes/18540705-he-sold-dog-food-from-his-condo-now-he-does-100m-a-year-russell-breuer-founder-of-spot-tango",
    founderName: "Russell Breuer",
    productUrl: "https://www.spotandtango.com",
    lead: "The delivery network was him, on the 5 a.m. subway, holding the boxes.",
    body: [
      {
        lead: "The ugly part.",
        text: "No factory, no logistics. Breuer cooked in a rented incubator kitchen for eight hours with a small team, packed the meals in pink butcher paper, froze them, and hand-delivered the first orders himself — riding the NYC subway at dawn to drop boxes on customers' doorsteps.",
      },
      {
        lead: "What they shipped anyway.",
        text: "It wasn't a P&L, it was proof of demand. Real people paid for fresh dog food and asked for more, which was all the signal he needed to go build the machine behind it.",
      },
      {
        lead: "Now.",
        text: "A direct-to-consumer fresh-pet-food company doing more than $100M a year.",
      },
    ],
    fileStats: [
      { label: "Early site", value: "2019" },
      { label: "Day-one ops", value: "cooked + delivered by hand" },
      { label: "Now", value: "$100M+ a year" },
    ],
    lesson: "Do it by hand until people prove they want it. Automate the proven part.",
  },
  {
    slug: "boldvoice",
    name: "BoldVoice",
    kind: "famous",
    tactic: "ugly-v1",
    thenImage: "/screenshots/boldvoice-then.png",
    thenCaption: "boldvoice.com at launch, 2021 — lessons filmed on a phone, one language.",
    thenYear: 2021,
    nowImage: "/screenshots/boldvoice-now.png",
    nowYear: new Date().getFullYear(),
    story:
      "BoldVoice's first version was accent lessons their Hollywood coach scripted and shot from his own apartment, covering one language — Hindi — with rough AI feedback. The earliest users came from a Reddit thread called \"Judge My Accent.\"",
    sourceUrl:
      "https://pmfshow.buzzsprout.com/1889238/episodes/18977152-she-bet-on-a-consumer-app-when-every-vc-wanted-b2b-then-grew-to-10m-arr-anada-lakra-founder-of-boldvoice",
    founderName: "Anada Lakra",
    productUrl: "https://www.boldvoice.com",
    lead: "The first lessons were filmed on a phone, in the coach's apartment, in one language.",
    body: [
      {
        lead: "The ugly part.",
        text: "No studio, no catalog. The team shipped a camera to Ron Carlos — a Hollywood accent coach who'd trained Game of Thrones actors — and he scripted and shot the lessons from his apartment. The app launched covering a single language, Hindi, with rudimentary AI feedback.",
      },
      {
        lead: "What they shipped anyway.",
        text: "They put it where the users were: a Reddit thread called \"Judge My Accent\" turned out to be the perfect proving ground for an app that scores how you sound.",
      },
      {
        lead: "Now.",
        text: "A consumer app at $10M ARR — built on the bet that people would pay to sound more confident, back when every VC wanted B2B.",
      },
    ],
    fileStats: [
      { label: "Founded", value: "2021" },
      { label: "Day-one catalog", value: "one language (Hindi)" },
      { label: "Filmed on", value: "a phone, in an apartment" },
    ],
    lesson: "Ship the smallest real version, then go where your users already argue about the problem.",
  },
  {
    slug: "aragon-ai",
    name: "Aragon",
    kind: "famous",
    tactic: "ugly-v1",
    thenImage: "/screenshots/aragon-ai-then.png",
    thenCaption: "aragon.ai's first page, 2022 — a black screen pitching AI 'graphic design.'",
    thenYear: 2022,
    nowImage: "/screenshots/aragon-ai-now.jpg",
    nowYear: new Date().getFullYear(),
    story:
      "Aragon launched as a bare black page promising AI design \"10x faster, 10x cheaper,\" then narrowed to headshots. They were, in Wesley Tian's words, \"atrocious\" — most users couldn't get one usable photo out of 250 — so he hand-fixed orders himself, an hour at a time.",
    sourceUrl:
      "https://pmfshow.buzzsprout.com/1889238/episodes/16756049-1st-time-founder-grows-ai-headshot-app-from-0-to-10m-arr-in-2-years-with-no-funding-wesley-tian-founder-of-aragon",
    founderName: "Wesley Tian",
    productUrl: "https://www.aragon.ai",
    lead: "The first AI headshots were, in the founder's own word, \"atrocious.\"",
    body: [
      {
        lead: "The ugly part.",
        text: "The first site was a black page promising AI design that was \"10x faster, 10x cheaper.\" When it narrowed to headshots, the output was terrible — Wesley Tian says most users wouldn't get a single usable photo out of 250.",
      },
      {
        lead: "What they shipped anyway.",
        text: "He charged anyway — $30 beat a $250 photographer — and covered the gap by hand, spending up to an hour per customer fixing and re-running orders so people got something usable. Fired from his job and rejected by 30 VCs, he had little to do but care.",
      },
      {
        lead: "Now.",
        text: "A profitable AI-headshot company at $10M ARR in two years, on no outside funding.",
      },
    ],
    fileStats: [
      { label: "Founded", value: "2022" },
      { label: "First-pass quality", value: "\"atrocious\"" },
      { label: "Founder support", value: "~1 hr/customer, by hand" },
    ],
    tactics: ["ugly-v1", "dont-scale"],
    lesson: "Ship it broken, then close the gap by hand until the product can do it for you.",
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

// Famous entries sharing a primary tactic, in catalog order — drives the
// home-page "whole catalog" grouped grid. Grouped by primary `tactic`, so a
// multi-tactic entry appears under exactly one heading.
export const famousByTactic = (t: Tactic) => famousEntries.filter((e) => e.tactic === t);
