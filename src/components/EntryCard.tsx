import Image from "next/image";
import Link from "next/link";
import { Entry, TACTIC_LABELS } from "@/data/entries";

export function EntryCard({ entry }: { entry: Entry }) {
  return (
    <article className="entry-card">
      <h3>
        <Link href={`/${entry.slug}`}>{entry.name}</Link>{" "}
        <span className="badge">{TACTIC_LABELS[entry.tactic]}</span>
      </h3>
      <div className="pair">
        <div>
          <Image
            src={entry.thenImage}
            alt={`${entry.name} in ${entry.thenYear}${entry.thenCaption ? ` — ${entry.thenCaption}` : ""}`}
            width={1280}
            height={960}
          />
          <p>
            <strong>{entry.thenYear}</strong>
            {entry.thenCaption ? ` — ${entry.thenCaption}` : ""}
          </p>
        </div>
        <div>
          {entry.nowImage ? (
            <>
              <Image
                src={entry.nowImage}
                alt={`${entry.name} in ${entry.nowYear}`}
                width={1280}
                height={960}
              />
              <p>
                <strong>{entry.nowYear}</strong>
              </p>
            </>
          ) : (
            <p>
              <strong>Now: TBD</strong> — they just shipped.
            </p>
          )}
        </div>
      </div>
      <p>{entry.story}</p>
      {entry.kind === "community" && entry.founderName && (
        <p>
          Shipped by <a href={entry.founderLink}>{entry.founderName}</a>
          {entry.productUrl && (
            <>
              {" — "}
              <a href={entry.productUrl}>see it live</a>
            </>
          )}
        </p>
      )}
    </article>
  );
}
