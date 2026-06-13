import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SubmitForm } from "@/components/SubmitForm";
import { TodoSeam } from "@/components/TodoSeam";

export const metadata: Metadata = {
  title: "Submit an ugly start",
  description:
    "We don't want your launch video. We want the draft you'd rather we didn't see. Get your ugly v1 featured next to Airbnb's.",
};

const RULES = [
  {
    title: "It has to be real.",
    desc: "Shipped, live, used by someone who wasn't your mom.",
  },
  {
    title: "It has to be a first version.",
    desc: "The draft, not the redesign. We want before, not after.",
  },
  {
    title: "Embarrassment is the entry fee.",
    desc: "If you're still proud of it, it's not ready for here yet.",
  },
];

export default function SubmitPage() {
  return (
    <div className="wrap">
      <SiteHeader variant="back" />

      <div className="submit-grid">
        <div className="submit-form-col">
          <div className="kicker">Add to the directory</div>
          <h1 className="submit__h">Submit an ugly start.</h1>
          <p className="submit__lead">
            We don&apos;t want your launch video. We want the draft you&apos;d rather we didn&apos;t
            see.
          </p>
          <SubmitForm />
        </div>

        <aside className="submit-rules-col">
          <div className="field__label">House rules</div>
          {RULES.map((r, i) => (
            <div className="rule" key={r.title}>
              <div className="rule__title">
                <span className="rule__num">{i + 1}.</span> {r.title}
              </div>
              <div className="rule__desc">{r.desc}</div>
            </div>
          ))}
          <div className="rules-note">
            Every entry here was once someone&apos;s worst-kept secret.
          </div>
        </aside>
      </div>

      <TodoSeam
        className="seam--submit"
        lines={["// the form opens a GitHub issue. the screenshot lands there. it's wired now."]}
      />
    </div>
  );
}
