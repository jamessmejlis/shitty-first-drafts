"use client";

import { useState } from "react";

// beehiiv public subscribe page, e.g. https://your-pub.beehiiv.com/subscribe.
// When set, the form hands off to beehiiv with the email prefilled; until then
// it stays honestly unwired (see the home TODO seam).
const subscribeUrl = process.env.NEXT_PUBLIC_BEEHIIV_SUBSCRIBE_URL;

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [queued, setQueued] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    if (subscribeUrl) {
      const sep = subscribeUrl.includes("?") ? "&" : "?";
      window.location.href = `${subscribeUrl}${sep}email=${encodeURIComponent(email)}`;
      return;
    }
    setQueued(true);
  }

  if (queued) {
    return (
      <p className="signup__help" role="status">
        Noted — {email}. We still have to wire beehiiv up, but you&apos;re first in line.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="signup__frame">
        <input
          className="signup__input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@startup.com"
          aria-label="Email address"
          required
        />
        <button className="signup__btn" type="submit">
          Subscribe
        </button>
      </div>
      <div className="signup__help">No spam. Unsubscribe anytime. Powered by beehiiv.</div>
    </form>
  );
}
