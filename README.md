# Learn LLM Foundations

An interactive, source-aligned learning companion to *Foundations of Large Language Models* by Tong Xiao and Jingbo Zhu.

**Live site:** [learn-llm-foundations-phi.vercel.app](https://learn-llm-foundations-phi.vercel.app/)

Learn LLM Foundations turns the book's core material into a structured web experience with 22 focused lessons, eight hands-on concept labs, section-level source references, and a searchable 57-term glossary. The course follows the complete language-model lifecycle, from pre-training objectives and BERT to prompting, alignment, efficient inference, and inference-time scaling.

The project is educational and noncommercial. It is designed for readers who want explanations that stay connected to the source while making the underlying objectives, tradeoffs, and systems easier to inspect.

## What you will learn

| Chapter | Topics |
| --- | --- |
| 1. Pre-training | Learning paradigms, self-supervised objectives, BERT, masking, downstream adaptation |
| 2. Generative models | Decoder-only Transformers, LLM training, distributed systems, scaling laws, long context |
| 3. Prompting | Prompt structure, in-context learning, reasoning, decomposition, RAG, tools, soft prompts |
| 4. Alignment | Instruction tuning, reward modeling, RLHF, DPO, process supervision, runtime alignment |
| 5. Inference | Prefilling, decoding, KV caching, batching, parallelism, serving metrics, test-time compute |

Every lesson includes page-level attribution to the source PDF. The lesson sidebar also maps individual sections to their corresponding source pages.

## Interactive labs

The eight deterministic labs explain concepts through direct manipulation rather than external model calls:

| Lab | What it demonstrates |
| --- | --- |
| Where does the teaching signal come from? | Compare supervised, self-supervised, and unsupervised learning |
| One corpus, three learning objectives | Explore decoder-only, encoder-only, and encoder-decoder objectives |
| What can BERT infer from both sides? | Mask tokens and inspect how bidirectional context changes predictions |
| How much of the model should move? | Compare full fine-tuning, feature extraction, and efficient adaptation |
| Balance a training budget | Explore the relationship between model capacity, data, and compute |
| Assemble a prompt | Combine instructions, context, examples, and output requirements |
| Create a preference signal | Compare responses and construct chosen/rejected preference data |
| Batching: throughput vs. latency | Observe how concurrency affects serving throughput and responsiveness |

These labs run entirely in the browser. No API key, model provider, database, or backend service is required.

## Features

- 22 statically generated lessons across five complete chapters
- Detailed MDX explanations with equations, tables, callouts, and practical tradeoffs
- Eight accessible interactive concept labs
- Searchable, alphabetized glossary with 57 linked definitions
- Section-level source-page navigation and downloadable source PDF
- Responsive desktop and mobile reading layouts
- Light and dark themes
- Previous/next lesson navigation and reading progress
- Metadata, sitemap, robots configuration, manifest, and generated social image
- Automated linting, type checking, tests, and production builds
- Deployment-ready configuration for Vercel

## Technology

- [Next.js](https://nextjs.org/) App Router
- [React](https://react.dev/) and TypeScript
- [MDX](https://mdxjs.com/) for lesson content
- [KaTeX](https://katex.org/) for mathematical notation
- [Lucide](https://lucide.dev/) for interface icons
- [Vitest](https://vitest.dev/) and Testing Library
- GitHub Actions for continuous integration
- Vercel for deployment

Most lesson content is rendered on the server. Client-side state is limited to the interactive labs, glossary filter, theme control, and reading progress.

## Project structure

```text
src/
|-- app/                         # Next.js routes, layouts, metadata, and styles
|   `-- chapters/[chapter]/      # Static chapter and lesson routes
|-- components/
|   |-- content/                 # MDX callouts and source notes
|   `-- simulators/              # Isolated interactive concept labs
|-- content/
|   |-- chapters/                # Lessons grouped by chapter slug
|   `-- lesson-components.ts     # Explicit static MDX import map
`-- lib/                         # Content registry and tested calculations
public/
`-- resources/                   # Downloadable source PDF
references/
`-- foundations-of-large-language-models.pdf
```

The content registry in `src/lib/content.ts` is the source of truth for chapter navigation, static route parameters, reading times, source-page mappings, glossary links, metadata, and the sitemap. Tests ensure lesson routes are unique, glossary links resolve, terms remain alphabetized, and every registered section matches an MDX anchor.

## Local development

### Requirements

- Node.js 22
- npm

### Setup

```bash
git clone https://github.com/And3m/learn-llm-foundations.git
cd learn-llm-foundations
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site works locally without secrets. For canonical sitemap and social metadata, create `.env.local` from `.env.example` and set:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Validate TypeScript without emitting files |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build` | Create the optimized production build |
| `npm run check` | Run lint, type checking, tests, and the production build |

## Verification

Run the same complete check used before deployment:

```bash
npm run check
```

The workflow in `.github/workflows/ci.yml` runs the corresponding checks for pushes to `main` and for pull requests.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Keep the detected framework as **Next.js**.
4. Add `NEXT_PUBLIC_SITE_URL=https://learn-llm-foundations-phi.vercel.app` for Production and Preview.
5. Deploy.

The included `vercel.json` declares the framework, and Vercel can use the standard Next.js build settings. No database, API key, server runtime service, or writable filesystem is required.

## Source and attribution

This project is an independent learning companion based on *Foundations of Large Language Models* by Tong Xiao and Jingbo Zhu. It is not an official publication or affiliated product.

The original source is preserved at `references/foundations-of-large-language-models.pdf` and served at `public/resources/foundations-of-large-language-models.pdf` for the website's source links. The source PDF's printed notice specifies CC BY-NC 4.0. The lesson copy is condensed and reorganized for interactive reading, while the interface and concept labs are original implementations.

See the website's `/license` route for the full in-project attribution notice.

## Author

Created by **Vijay Andem**.

- [Portfolio](https://vijayandem.vercel.app/)
- [GitHub](https://github.com/And3m)
- [LinkedIn](https://www.linkedin.com/in/vijay-andem-b2092223/)
