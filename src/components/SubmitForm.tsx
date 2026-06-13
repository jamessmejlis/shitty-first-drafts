"use client";

import { useRef, useState } from "react";
import type { Tactic } from "@/data/entries";
import { repoUrl } from "@/lib/site";

// Short toggle labels matching the design (the issue template carries the full
// house-tactic names). Order = the four house tactics.
const TACTIC_TOGGLES: { key: Tactic; label: string }[] = [
  { key: "ugly-v1", label: "Ugly v1" },
  { key: "dont-scale", label: "Did things that don't scale" },
  { key: "sold-first", label: "Sold it first" },
  { key: "duct-tape-demo", label: "Duct-taped it" },
];

const ISSUE_TEMPLATE = "submit-your-ugly-mvp.yml";

/** The submit form is the joke — "we want the draft you'd rather we didn't see."
 *  On "Ship it ugly →" it opens a GitHub issue prefilled from these fields; the
 *  founder attaches the embarrassing screenshot there (GitHub stores it). */
export function SubmitForm() {
  const [handle, setHandle] = useState("");
  const [product, setProduct] = useState("");
  const [link, setLink] = useState("");
  const [story, setStory] = useState("");
  const [tactics, setTactics] = useState<Set<Tactic>>(new Set<Tactic>(["ugly-v1"]));
  const [fileName, setFileName] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [issueUrl, setIssueUrl] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function toggle(t: Tactic) {
    setTactics((prev) => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }

  function pickFile(file: File | null | undefined) {
    if (file) setFileName(file.name);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const h = handle.trim();
    const p = product.trim();
    const l = link.trim();
    const s = story.trim();

    if (!h || !p || !l) {
      setError("Add your handle, the product, and a link — that part has to be real.");
      return;
    }
    if (s.length < 20) {
      setError("Tell us what's embarrassing — at least a sentence.");
      return;
    }
    if (tactics.size === 0) {
      setError("Pick at least one tactic.");
      return;
    }
    setError(null);

    const labels = TACTIC_TOGGLES.filter((t) => tactics.has(t.key))
      .map((t) => t.label)
      .join(", ");
    const params = new URLSearchParams({
      template: ISSUE_TEMPLATE,
      title: `Ugly MVP: ${p}`,
      handle: h,
      product: p,
      link: l,
      story: s,
      tactics: labels,
    });
    const url = `${repoUrl}/issues/new?${params.toString()}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIssueUrl(url);
  }

  if (issueUrl) {
    return (
      <div className="submit-sent" role="status">
        <p>
          <strong>Shipped. We&apos;ll be appropriately unimpressed.</strong>
        </p>
        <p>
          We opened a GitHub issue with your details. Drop the embarrassing screenshot in there
          and hit <em>Submit new issue</em> to finish.
        </p>
        <p>
          Tab didn&apos;t open?{" "}
          <a className="link" href={issueUrl} target="_blank" rel="noopener noreferrer">
            Finish on GitHub →
          </a>
        </p>
      </div>
    );
  }

  return (
    <form className="fields" onSubmit={onSubmit} noValidate>
      <div>
        <div className="field__label">Your handle</div>
        <input
          className="input"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          placeholder="@yourname"
          aria-label="Your handle"
        />
      </div>

      <div className="field-row">
        <div>
          <div className="field__label">Product</div>
          <input
            className="input"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="What's it called?"
            aria-label="Product"
          />
        </div>
        <div>
          <div className="field__label">Link</div>
          <input
            className="input"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://"
            aria-label="Link"
          />
        </div>
      </div>

      <div>
        <div className="field__label">What&apos;s embarrassing about it?</div>
        <textarea
          className="textarea"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Be honest. The uglier the better — that's the whole point."
          aria-label="What's embarrassing about it?"
        />
      </div>

      <div>
        <div className="field__label">Tactics (pick any)</div>
        <div className="tactic-toggles">
          {TACTIC_TOGGLES.map((t) => {
            const on = tactics.has(t.key);
            return (
              <button
                type="button"
                key={t.key}
                className={`tactic-toggle${on ? " is-on" : ""}`}
                aria-pressed={on}
                onClick={() => toggle(t.key)}
              >
                {on ? "☑" : "☐"} {t.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="field__label">Proof (the embarrassing screenshot)</div>
        <div
          className={`dropzone${dragging ? " is-dragging" : ""}`}
          onClick={() => fileRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            pickFile(e.dataTransfer.files?.[0]);
          }}
        >
          {fileName ? (
            <>
              ✓ {fileName} — you&apos;ll attach it on GitHub in the next step.
            </>
          ) : (
            <>
              Drop your ugly v1 screenshot here, or <span className="link">browse</span>. It&apos;s
              attached on GitHub, where it&apos;s stored.
            </>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={(e) => pickFile(e.target.files?.[0])}
          />
        </div>
      </div>

      {error && (
        <p className="submit-error" role="alert">
          {error}
        </p>
      )}

      <div className="submit-row">
        <button className="btn" type="submit">
          Ship it ugly →
        </button>
        <span className="submit-aside">No polish required. Seriously.</span>
      </div>
    </form>
  );
}
