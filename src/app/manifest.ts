import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest { return { name: "Learn LLM Foundations", short_name: "LLM Foundations", description: "The foundations of large language models, explained interactively.", start_url: "/", display: "standalone", background_color: "#f7f6f0", theme_color: "#178f52" }; }
