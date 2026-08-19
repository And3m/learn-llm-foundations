import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

const brandBase = { viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };

export function MarkIcon(props: IconProps) {
  return <svg {...base} {...props}><rect x="3" y="3" width="9" height="9" rx="2" /><rect x="15" y="3" width="6" height="6" rx="2" /><rect x="3" y="15" width="6" height="6" rx="2" /><rect x="12" y="12" width="9" height="9" rx="2" /></svg>;
}

export function ArrowIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

export function PlayIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="m9 7 8 5-8 5V7Z" /></svg>;
}

export function GlossaryIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M10 6h10M10 12h10M10 18h10" /><circle cx="5" cy="6" r="1" fill="currentColor" stroke="none" /><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="5" cy="18" r="1" fill="currentColor" stroke="none" /></svg>;
}

export function SunIcon(props: IconProps) {
  return <svg {...base} {...props}><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" /></svg>;
}

export function MoonIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M20.5 14.4A8 8 0 0 1 9.6 3.5 8.5 8.5 0 1 0 20.5 14.4Z" /></svg>;
}

export function MenuIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}

export function BookIcon(props: IconProps) {
  return <svg {...base} {...props}><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z" /></svg>;
}

export function LinkedInIcon(props: IconProps) {
  return <svg {...brandBase} {...props}><path d="M6.94 8.5H3.56v11h3.38v-11ZM5.25 3a1.96 1.96 0 1 0 0 3.92A1.96 1.96 0 0 0 5.25 3ZM9.14 8.5h3.24V10h.05c.45-.85 1.55-1.75 3.19-1.75 3.42 0 4.05 2.25 4.05 5.18v6.07h-3.38v-5.38c0-1.28-.02-2.93-1.79-2.93-1.79 0-2.06 1.4-2.06 2.84v5.47h-3.3v-11Z" /></svg>;
}

export function GitHubIcon(props: IconProps) {
  return <svg {...brandBase} {...props}><path fillRule="evenodd" d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-1.05-.01-1.91-2.78.62-3.37-1.21-3.37-1.21-.45-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.57 2.34 1.11 2.91.85.09-.67.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05A9.31 9.31 0 0 1 12 8.14a9.3 9.3 0 0 1 2.5.35c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.95.68 1.92 0 1.39-.01 2.5-.01 2.84 0 .27.18.59.69.49A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z" clipRule="evenodd" /></svg>;
}
