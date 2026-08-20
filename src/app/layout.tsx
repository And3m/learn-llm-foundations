import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Literata } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteUrl } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const literata = Literata({ subsets: ["latin"], variable: "--font-serif" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Learn LLM Foundations", template: "%s · Learn LLM Foundations" },
  description: "An interactive companion to the foundations of large language models — from pre-training to inference.",
  applicationName: "Learn LLM Foundations",
  authors: [{ name: "Vijay Andem", url: "https://vijayandem.vercel.app/" }],
  creator: "Vijay Andem",
  keywords: ["large language models", "LLM", "pre-training", "BERT", "machine learning", "interactive learning"],
  openGraph: { title: "Learn LLM Foundations", description: "The foundations of large language models, explained interactively.", type: "website", url: siteUrl },
  twitter: { card: "summary_large_image", title: "Learn LLM Foundations", description: "The foundations of large language models, explained interactively." },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f7f6f0" }, { media: "(prefers-color-scheme: dark)", color: "#111310" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${literata.variable} ${mono.variable}`}>
      <body>
        <ThemeProvider><SiteHeader />{children}<SiteFooter /></ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
