# Learn LLM Foundations

An interactive, source-aligned learning companion to *Foundations of Large Language Models* by Tong Xiao and Jingbo Zhu.

**Live site:** [learn-llm-foundations-phi.vercel.app](https://learn-llm-foundations-phi.vercel.app/)

Learn LLM Foundations turns the book's core material into a structured web course. The course has these parts:

- 22 focused lessons.
- 40 diagrams.
- Eight hands-on concept labs.
- Section-level source references.
- A searchable 57-term glossary.

It follows the full language-model life cycle, from pre-training objectives and BERT to prompting, alignment, efficient inference and inference-time scaling.

The lessons are written in **Simplified Technical English (STE)**, a controlled language for technical documentation. Sentences are short, verbs are active and each word has one meaning. Readers whose first language is not English, or who are new to the field, can follow the ideas without fighting the prose.

The project is educational and noncommercial.

## What you will learn

| Chapter | Topics |
| --- | --- |
| 1. Pre-training | Learning paradigms, self-supervised objectives, BERT, masking, downstream adaptation |
| 2. Generative models | Decoder-only Transformers, LLM training, distributed systems, scaling laws, long context |
| 3. Prompting | Prompt structure, in-context learning, reasoning, decomposition, RAG, tools, soft prompts |
| 4. Alignment | Instruction tuning, reward modeling, RLHF, DPO, process supervision, runtime alignment |
| 5. Inference | Prefilling, decoding, KV caching, batching, parallelism, serving metrics, test-time compute |

Every lesson cites the pages of the source PDF that it covers. The lesson sidebar maps each section to its source pages.

## Diagrams

Each lesson has at least one diagram, and each has a short STE caption.

- **21 Mermaid diagrams (UML style).** Flowcharts, sequence diagrams (for example a request through prefill and decode, one RLHF iteration, and RAG with a tool call), class diagrams, a state diagram and a concept map for each chapter.
- **19 animated SVG diagrams.** Step-by-step visuals, for example:
  - BERT's 80/10/10 masking.
  - Causal and bidirectional attention masks.
  - Data, tensor and pipeline parallelism.
  - The prefill and decode phases.
  - KV-cache growth.
  - Static and continuous batching.
  - Temperature, top-k and top-p.
  - Process and outcome supervision.

  Each has Play/Pause and Previous/Next controls.

How the diagrams behave:

- **Theme.** The diagrams follow the light and dark themes.
- **Animation.**
  - The animations start paused when the reader prefers reduced motion.
  - They stop when the diagram is off screen or the tab is hidden.
  - Screen readers announce a step only when the reader moves to it.
- **Size.** Mermaid charts are never scaled above their natural size, so their labels stay at 14px.
  - In a wide column, a large chart shrinks to fit.
  - On a phone, the chart keeps its natural size and scrolls sideways.
- **Loading.** The Mermaid runtime loads only when a diagram comes near the viewport.

## Interactive labs

The eight labs explain concepts through direct manipulation. They do not call a model:

| Lab | What it demonstrates |
| --- | --- |
| Where does the teaching signal come from? | Compare supervised, self-supervised and unsupervised learning |
| One corpus, three learning objectives | Explore decoder-only, encoder-only and encoder-decoder objectives |
| What can BERT infer from both sides? | Mask tokens and see how bidirectional context changes predictions |
| How much of the model should move? | Compare full fine-tuning, feature extraction and partial fine-tuning |
| Balance a training budget | Explore the relation between model capacity, data and compute |
| Assemble a prompt | Combine instructions, context, examples and output requirements |
| Create a preference signal | Compare responses and build chosen/rejected preference data |
| Batching: throughput vs. latency | See how concurrency changes serving throughput and responsiveness |

The labs run in the browser. They need no API key, model provider, database or backend service.

## Features

- 22 statically generated lessons in five chapters, written in Simplified Technical English, with equations, tables and callouts.
- 40 diagrams (Mermaid and animated SVG) and eight accessible labs.
- A searchable, alphabetized glossary with 57 linked definitions.
- Section-level source-page navigation and a downloadable source PDF.
- **Readable typography on all screen sizes:**
  - A fluid type scale: headings grow with the screen and stop at a comfortable maximum.
  - 17px lesson text.
  - No text smaller than 12px.
- **Accessibility:**
  - WCAG AA text contrast in both themes.
  - Tap targets of at least 24×24px.
  - Keyboard-operable diagram controls.
  - Reduced-motion support.
- Light and dark themes, reading progress, and previous/next lesson navigation.
- Metadata, a sitemap, robots configuration, a manifest and a generated social image.
- Vercel Web Analytics.

## Performance

The site is static. These choices keep each page small:

- **No PDF prefetch.** Links to the 2.6 MB source PDF are plain links, so the browser does not download the PDF when the link scrolls into view. The PDF is cached for one day.
- **Lazy diagrams.** The Mermaid runtime (about 210 KB gzipped) loads only when a reader comes near a diagram.
- **Lesson-only styles.** KaTeX, lab and diagram styles load only on lesson pages.
- **Less prefetching.** Glossary and sidebar lesson links do not prefetch every lesson.
- **Fonts.** The site loads one weight of the monospace font, and does not preload it.
- **Cheap scroll handling.** The reading-progress bar updates one transform per animation frame.

On a production build, a full scroll of the home page or the glossary transfers about 300 KB, down from about 3 MB. A lesson's first load fetches about 157 KB of JavaScript, down from 367 KB. Cumulative layout shift is 0.

## Technology

- [Next.js](https://nextjs.org/) 16 App Router (static generation)
- [React](https://react.dev/) 19 and TypeScript
- [MDX](https://mdxjs.com/) for lesson content
- [KaTeX](https://katex.org/) for mathematical notation
- [Mermaid](https://mermaid.js.org/) for UML-style diagrams, plus hand-built animated SVG components
- [Tailwind CSS](https://tailwindcss.com/) 4 and plain CSS with design tokens
- [Lucide](https://lucide.dev/) for interface icons
- [Vitest](https://vitest.dev/) and Testing Library
- GitHub Actions for continuous integration
- Vercel for deployment and Web Analytics

The server renders most of each lesson. Client-side code is limited to these parts: the labs, the diagrams, the glossary filter, the theme control and the reading progress bar.

## Project structure

```text
.claude/
|-- settings.json                # Claude Code hook and allowed check commands
`-- hooks/check-lessons.mjs      # Runs the STE and Mermaid tests after a lesson or diagram edit
scripts/
`-- check-ui.mjs                 # Layout and typography check on 10 device sizes (npm run check:ui)
src/
|-- app/                         # Next.js routes, layouts, metadata and global styles
|   `-- chapters/
|       |-- [chapter]/[lesson]/  # Lesson route; its layout loads KaTeX, lab and diagram styles
|       |-- simulator.css        # Lab styles
|       `-- diagrams.css         # Diagram styles
|-- components/
|   |-- content/                 # MDX callouts and source notes
|   |-- diagrams/                # MermaidDiagram, DiagramFrame, SVG helpers, one file of animated diagrams per chapter
|   `-- simulators/              # Interactive concept labs
|-- content/
|   `-- chapters/                # One MDX file per lesson, grouped by chapter slug
`-- lib/                         # Content registry, lab calculations and tests
public/
`-- resources/                   # Downloadable source PDF
references/
`-- foundations-of-large-language-models.pdf
```

`src/lib/content.ts` is the source of truth for these items:

- Chapter navigation and static route parameters.
- Reading times and source-page mappings.
- Glossary links.
- Metadata and the sitemap.

The lesson page imports only its own MDX file.

## Writing and editing lessons

The lessons follow a practical form of ASD-STE100:

1. Sentences have at most 25 words (20 for instructions). Each sentence has one idea.
2. Use active voice and simple tenses. Write instructions as commands.
3. One word has one meaning. Avoid vague words such as "leverage", "utilize" or "various".
4. Use a list for three or more items, or for any sequence.
5. Keep technical names (Transformer, KV cache, RLHF, DPO). Define each one the first time it appears.
6. Keep every equation, and add one plain sentence after it that says what it calculates.

Rules for the structure:

- Keep every `<h2 id="...">` anchor. The registry and the tests depend on it.
- Keep the `<SourceNote pages>` values.

### Adding a diagram

- **Mermaid:** Add a `<MermaidDiagram title="..." caption="..." chart={`...`} />` block in the MDX. The component is available in every lesson.
  - Prefer a layout direction that keeps the chart narrow. Use top-down for chains and left-right for fan-outs.
  - Use a rounded node `([...])` instead of a decision diamond, unless the node is a real yes/no decision.
- **Animated SVG:** Add a component to the chapter's file in `src/components/diagrams/`.
  - Wrap it in `DiagramFrame`. The frame receives the step number and gives the controls, the reduced-motion handling and the captions.
  - Use `Box`, `Arrow`, `Label`, `Meter` and `Svg` from `svg.tsx`.

## Local development

### Requirements

- Node.js 22
- npm
- Chrome or Edge (only for `npm run check:ui`)

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
| `npm run check` | Run lint, type checking, tests and the production build |
| `npm run check:ui -- --base <url>` | Check the running site on 10 device sizes in light and dark (see below) |

## Verification

Run the same full check that CI runs before deployment:

```bash
npm run check
```

The workflow in `.github/workflows/ci.yml` runs these checks for pushes to `main` and for pull requests.

The test suite also guards the lesson text and diagrams:

- `src/lib/ste.test.ts` fails on any lesson sentence or diagram caption longer than 25 words, and on words that the STE rules above do not allow.
- `src/lib/diagrams.test.ts` parses every Mermaid chart in the lessons.

### UI check on all device sizes

Start the site with `npm run build && npm start`, or `npm run dev`. Then run:

```bash
npm run check:ui -- --base http://localhost:3000
npm run check:ui -- --base http://localhost:3000 --devices "iPhone SE,Desktop 1440" --themes dark --shots ./ui-shots
```

The script opens the key pages in headless Chrome on 10 device profiles, from a 280px Galaxy Fold to a 1920px desktop, including tablets and a landscape phone. It fails on any of these problems:

- A page that scrolls sideways.
- Text smaller than 12px, or diagram labels smaller than 10.5px on screen.
- Page titles that wrap too many times.
- Tap targets smaller than 24×24px.
- Misaligned rows, such as the breadcrumb.
- Console errors.

Use `--pages` to check other routes.

Only Chromium-based browsers (Chrome and Edge) are tested automatically. Check Safari on a real iPhone before a major release.

### Claude Code

`.claude/settings.json` runs the STE and Mermaid tests automatically after Claude Code edits a lesson or a diagram component, and reports any failure back to Claude. It also allows the read-only check commands without a prompt.

### Git on Windows: "detected dubious ownership"

If a different Windows user created the repository folder, Git does not run in it. Mark the folder as safe one time:

```bash
git config --global --add safe.directory <path-to-this-repo>
```

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repository into Vercel.
3. Keep the detected framework as **Next.js**.
4. Add `NEXT_PUBLIC_SITE_URL=https://learn-llm-foundations-phi.vercel.app` for Production and Preview.
5. Deploy.

Each pull request gets a Vercel preview deployment. Previews are protected, so log in to Vercel to open them. Merging to `main` deploys to production. The site needs no database, API key, server runtime service or writable filesystem.

## Changelog

- **Diagram sizing (#3).**
  - Mermaid charts render at their natural size instead of stretching to the column.
  - Wide charts are more compact and fit the column on desktop.
  - The concept maps use the theme colors.
- **Review fixes (#2).**
  - Lesson wording is more accurate: zero-shot prompting, prefix fine-tuning, the RLHF KL penalty, linearized and tiled attention, BIO tags, and the masked denoising example.
  - Paused diagrams stop moving.
  - Lab, diagram and KaTeX styles load only on lesson pages.
- **STE rewrite and diagrams (#1).**
  - All lessons, the glossary and the labs are rewritten in Simplified Technical English.
  - 40 diagrams added.
  - Performance work, as described in the Performance section.
  - Next.js upgraded to 16.3.8 for security fixes.
  - A fluid type scale with a 12px text floor, and WCAG AA contrast.
  - The UI device check, the STE guard and the Claude Code hook.
  - Vercel Web Analytics.

## Source and attribution

This project is an independent learning companion based on *Foundations of Large Language Models* by Tong Xiao and Jingbo Zhu. It is not an official publication or affiliated product.

The original source is kept at `references/foundations-of-large-language-models.pdf`. The website serves it from `public/resources/foundations-of-large-language-models.pdf` for its source links. The printed notice in the source PDF specifies CC BY-NC 4.0.

The lesson text is a condensed rewrite of the source in Simplified Technical English, organized for interactive reading. The interface, labs and diagrams are original work.

See the website's `/license` route for the full attribution notice.

## Author

Created by **Vijay Andem**.

- [Portfolio](https://vijayandem.vercel.app/)
- [GitHub](https://github.com/And3m)
- [LinkedIn](https://www.linkedin.com/in/vijay-andem-b2092223/)
