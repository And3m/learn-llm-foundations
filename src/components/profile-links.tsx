import { GitHubIcon, LinkedInIcon, PortfolioIcon } from "./icons";

const profiles = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vijay-andem-b2092223/", icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/And3m", icon: GitHubIcon },
  { label: "Portfolio", href: "https://vijayandem.vercel.app/", icon: PortfolioIcon },
] as const;

type ProfileLinksProps = {
  className?: string;
  variant?: "icons" | "menu";
};

export function ProfileLinks({ className = "", variant = "icons" }: ProfileLinksProps) {
  const classes = ["profile-links", `profile-links--${variant}`, className].filter(Boolean).join(" ");

  return (
    <nav className={classes} aria-label="Vijay Andem profiles">
      {profiles.map(({ label, href, icon: Icon }) => (
        <a href={href} key={label} rel="noreferrer noopener" target="_blank" title={label} aria-label={`Vijay Andem on ${label}`}>
          <Icon />
          {variant === "menu" ? <span>{label}</span> : null}
        </a>
      ))}
    </nav>
  );
}
