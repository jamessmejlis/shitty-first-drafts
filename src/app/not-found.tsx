import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { TodoSeam } from "@/components/TodoSeam";

export default function NotFound() {
  return (
    <div className="wrap">
      <SiteHeader />

      <div className="notfound">
        <div className="kicker">Error — page not found</div>
        <div className="notfound__num">404</div>
        <h1 className="notfound__h">This page shipped, then vanished.</h1>
        <p className="notfound__lead">
          Either it never existed or it wasn&apos;t ready. Very on-brand for us. Keep moving.
        </p>
        <div className="notfound__links">
          <Link href="/" className="link">
            ‹ Back to the directory
          </Link>
          <Link href="/submit" className="link">
            Submit an ugly start →
          </Link>
        </div>
        <TodoSeam lines={["// TODO: build a real 404. this one will do for now."]} />
      </div>
    </div>
  );
}
