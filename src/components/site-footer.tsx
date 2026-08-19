import Link from "next/link";
import { GitHubIcon, LinkedInIcon, PortfolioIcon } from "./icons";

const profiles = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vijay-andem-b2092223/", icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/And3m", icon: GitHubIcon },
  { label: "Portfolio", href: "https://vijayandem.vercel.app/", icon: PortfolioIcon },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__about">
        <p className="eyebrow">An independent learning companion</p>
        <p>Based on <em>Foundations of Large Language Models</em> by Tong Xiao and Jingbo Zhu.</p>
      </div>
      <div className="site-footer__meta">
        <div className="site-footer__links">
          <Link href="/license">Attribution &amp; license</Link>
          <a href="https://arxiv.org/abs/2501.09223" rel="noreferrer noopener" target="_blank">arXiv source</a>
          <Link href="/resources/foundations-of-large-language-models.pdf">Download PDF</Link>
        </div>
        <div className="site-footer__creator">
          <span>Created by <a href="https://vijayandem.vercel.app/" rel="noreferrer noopener" target="_blank">Vijay Andem</a></span>
          <nav className="social-links" aria-label="Vijay Andem profiles">
            {profiles.map(({ label, href, icon: Icon }) => (
              <a className="social-link" href={href} key={label} rel="noreferrer noopener" target="_blank" title={label} aria-label={`Vijay Andem on ${label}`}>
                <Icon />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
