import Link from "next/link";
import { ProfileLinks } from "./profile-links";

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
          <ProfileLinks />
        </div>
      </div>
    </footer>
  );
}
