import Link from "next/link";
import { BookIcon, MarkIcon, MenuIcon } from "./icons";
import { ProfileLinks } from "./profile-links";
import { ThemeToggle } from "./theme-toggle";

const links = [
  ["Read", "/chapters/pre-training"],
  ["Glossary", "/glossary"],
  ["Resources", "/reading"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link className="brand" href="/" aria-label="Learn LLM Foundations home">
          <MarkIcon className="brand__mark" />
          <span>Learn LLM Foundations</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
        </nav>
        <ProfileLinks className="header-profiles" />
        <div className="header-actions">
          <ThemeToggle />
          <details className="mobile-menu">
            <summary className="icon-button" aria-label="Open navigation"><MenuIcon /></summary>
            <div className="mobile-menu__panel">
              <nav aria-label="Mobile navigation">
                {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
                <Link href="/resources/foundations-of-large-language-models.pdf"><BookIcon /> Source PDF</Link>
              </nav>
              <ProfileLinks variant="menu" />
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
