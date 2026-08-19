import Link from "next/link";

export default function NotFound() {
  return <main className="page-shell"><header className="page-header"><span className="eyebrow">404 · Token not found</span><h1>This path fell out of context.</h1><p>The lesson may be in a future chapter, or the URL may have changed.</p></header><Link className="button primary" style={{ width: "fit-content", paddingInline: "1rem" }} href="/">Return home</Link></main>;
}
