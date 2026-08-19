export type Lesson = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  sourcePages: string;
  readingMinutes: number;
  sections: { id: string; label: string }[];
};

export type Chapter = {
  slug: string;
  number: number;
  title: string;
  description: string;
  overview: string;
  status: "available";
  lessons: Lesson[];
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  chapter?: string;
  lesson?: string;
};

const lesson = (
  slug: string,
  number: string,
  title: string,
  shortTitle: string,
  description: string,
  sourcePages: string,
  readingMinutes: number,
  sections: [string, string][],
): Lesson => ({
  slug, number, title, shortTitle, description, sourcePages: sourcePages.replace(/\u0013/g, "-"), readingMinutes,
  sections: sections.map(([id, label]) => ({ id, label })),
});

export const preTrainingLessons = [
  lesson("pre-training-models", "1.1", "Pre-training NLP models", "Pre-training models", "Why general models are trained before they are adapted, and where their supervision comes from.", "16", 8, [["the-two-problems", "The two problems"], ["three-paradigms", "Three paradigms"], ["adapting-models", "Adapting models"]]),
  lesson("self-supervised-tasks", "1.2", "Self-supervised pre-training tasks", "Self-supervised tasks", "How decoder-only, encoder-only, and encoder-decoder objectives learn from unlabeled text.", "720", 12, [["labels-from-text", "Labels from text"], ["three-objectives", "Three objectives"], ["choosing-an-objective", "Choosing an objective"]]),
  lesson("bert", "1.3", "BERT, worked through", "BERT", "A concrete look at masked language modeling, model scale, efficiency, and multilingual variants.", "2129", 10, [["standard-bert", "Standard BERT"], ["masking-lab", "Masking lab"], ["variants", "Variants"]]),
  lesson("applying-bert", "1.4", "Applying BERT models", "Applying BERT", "Feature extraction, fine-tuning, task heads, and the trade-offs between them.", "3034", 8, [["task-heads", "Task heads"], ["adaptation-strategies", "Adaptation strategies"], ["practical-choice", "Practical choice"]]),
  lesson("summary", "1.5", "Chapter summary", "Summary", "Connect the objectives, architectures, and adaptation choices into one mental model.", "35", 4, [["mental-model", "The mental model"], ["decision-guide", "Decision guide"], ["next", "What comes next"]]),
];

export const generativeModelLessons = [
  lesson("llm-pipeline", "2.1", "A practical map of large language models", "The LLM pipeline", "Connect decoder-only generation, pre-training, adaptation, alignment, and prompting.", "3755", 11, [["probability-to-text", "Probability to text"], ["training-pipeline", "Training pipeline"], ["using-the-model", "Using the model"]]),
  lesson("training-at-scale", "2.2", "Training at scale", "Training at scale", "Data, distributed computation, and scaling laws behind modern language models.", "5665", 10, [["data-is-a-design-choice", "Data as a design choice"], ["distributed-training", "Distributed training"], ["scaling-laws", "Scaling laws"]]),
  lesson("long-sequence-modeling", "2.3", "Long-sequence modeling", "Long sequences", "Why context is expensive and how efficient attention, KV sharing, and positional methods extend it.", "6693", 13, [["context-bottleneck", "The context bottleneck"], ["efficient-architectures", "Efficient architectures"], ["position-and-memory", "Position and memory"]]),
  lesson("summary", "2.4", "Chapter summary", "Summary", "A compact view of the choices that turn next-token prediction into a scalable LLM.", "94", 4, [["mental-model", "The mental model"], ["tradeoffs", "Core trade-offs"], ["next", "What comes next"]]),
];

export const promptingLessons = [
  lesson("general-prompt-design", "3.1", "General prompt design", "Prompt design", "Structure instructions, context, examples, and outputs so the model can infer the intended task.", "97114", 10, [["prompt-anatomy", "Prompt anatomy"], ["in-context-learning", "In-context learning"], ["design-checklist", "Design checklist"]]),
  lesson("advanced-prompting", "3.2", "Advanced prompting", "Advanced prompting", "Reasoning traces, decomposition, self-refinement, ensembling, retrieval, and tools.", "115137", 13, [["reasoning-and-decomposition", "Reasoning and decomposition"], ["refine-and-ensemble", "Refine and ensemble"], ["retrieval-and-tools", "Retrieval and tools"]]),
  lesson("learning-to-prompt", "3.3", "Learning to prompt", "Learning to prompt", "Treat prompt creation as an optimization problem, from discrete search to soft prompts and compression.", "138152", 10, [["prompt-optimization", "Prompt optimization"], ["soft-prompts", "Soft prompts"], ["prompt-compression", "Prompt compression"]]),
  lesson("summary", "3.4", "Chapter summary", "Summary", "Choose the lightest prompting method that supplies the information and computation a task needs.", "153", 4, [["mental-model", "The mental model"], ["method-guide", "Method guide"], ["next", "What comes next"]]),
];

export const alignmentLessons = [
  lesson("alignment-overview", "4.1", "Why alignment is a separate stage", "Alignment overview", "Why predicting internet text is not the same objective as being helpful, safe, and responsive.", "155156", 5, [["objective-gap", "The objective gap"], ["alignment-pipeline", "Alignment pipeline"], ["limits", "Limits"]]),
  lesson("instruction-alignment", "4.2", "Instruction alignment", "Instruction alignment", "Supervised fine-tuning, instruction data, generalization, and weak-to-strong supervision.", "157171", 11, [["supervised-fine-tuning", "Supervised fine-tuning"], ["instruction-data", "Instruction data"], ["generalization", "Generalization"]]),
  lesson("rlhf", "4.3", "Reinforcement learning from human feedback", "RLHF", "Turn pairwise human preferences into a reward signal and use it to improve a language model.", "172186", 12, [["preference-data", "Preference data"], ["reward-model", "Reward model"], ["policy-optimization", "Policy optimization"]]),
  lesson("improved-alignment", "4.4", "Improved alignment methods", "Improved alignment", "DPO, synthetic preference data, stronger reward modeling, and inference-time alignment.", "187200", 11, [["better-feedback", "Better feedback"], ["direct-preference-optimization", "Direct preference optimization"], ["automatic-and-stepwise", "Automatic and stepwise alignment"]]),
  lesson("summary", "4.5", "Chapter summary", "Summary", "Relate demonstrations, comparisons, reward models, and direct objectives in one alignment map.", "201202", 4, [["mental-model", "The mental model"], ["method-guide", "Method guide"], ["next", "What comes next"]]),
];

export const inferenceLessons = [
  lesson("prefilling-and-decoding", "5.1", "Prefilling and decoding", "Prefill and decode", "Follow a request through prompt processing, token-by-token generation, decoding algorithms, and metrics.", "204221", 12, [["two-phase-inference", "Two-phase inference"], ["decoding-algorithms", "Decoding algorithms"], ["serving-metrics", "Serving metrics"]]),
  lesson("efficient-inference", "5.2", "Efficient inference", "Efficient inference", "Use caches, batching, and parallelism to balance latency, throughput, memory, and utilization.", "222233", 11, [["kv-caching", "KV caching"], ["batching", "Batching"], ["parallelism", "Parallelism"]]),
  lesson("inference-time-scaling", "5.3", "Inference-time scaling", "Inference-time scaling", "Spend additional computation on context, search, ensembling, and verified reasoning paths.", "234244", 10, [["scaling-context", "Scale context"], ["search-and-ensembling", "Search and ensembling"], ["thinking-paths", "Thinking paths"]]),
  lesson("summary", "5.4", "Chapter summary", "Summary", "Connect generation quality to the systems work that makes model serving practical.", "245246", 4, [["mental-model", "The mental model"], ["tradeoffs", "Core trade-offs"], ["continue", "Continue learning"]]),
];

export const chapters: Chapter[] = [
  { slug: "pre-training", number: 1, title: "Pre-training", description: "Foundation models, learning objectives, BERT, and adaptation.", overview: "Before a model can answer a prompt, it needs a broad model of language. Learn how raw text becomes its own teacher, why architectures learn different capabilities, and how a general model becomes useful for a specific task.", status: "available", lessons: preTrainingLessons },
  { slug: "generative-models", number: 2, title: "Generative models", description: "Building and scaling decoder-only language models.", overview: "Move from the next-token objective to the full LLM pipeline: data construction, distributed training, empirical scaling laws, and the architectures that make longer context possible.", status: "available", lessons: generativeModelLessons },
  { slug: "prompting", number: 3, title: "Prompting", description: "Prompt design, reasoning methods, RAG, and tool use.", overview: "A prompt is both an interface and a temporary program. Learn how instructions, examples, reasoning strategies, retrieved evidence, and tools reshape model behavior without changing its weights.", status: "available", lessons: promptingLessons },
  { slug: "alignment", number: 4, title: "Alignment", description: "Instruction tuning, preference learning, RLHF, and DPO.", overview: "Pre-training teaches what text looks like; alignment teaches which responses people prefer. Follow the progression from supervised demonstrations to reward modeling and direct preference objectives.", status: "available", lessons: alignmentLessons },
  { slug: "inference", number: 5, title: "Inference", description: "Decoding, efficient serving, and inference-time scaling.", overview: "Serving an LLM is a systems problem as well as a modeling problem. Understand prefilling, token-by-token decoding, caches, batches, parallelism, and the extra compute used to improve answers at inference time.", status: "available", lessons: inferenceLessons },
];

export const glossary: GlossaryTerm[] = [
  { term: "Adaptation", definition: "Changing a pre-trained model or its use so it performs a downstream task.", chapter: "pre-training", lesson: "applying-bert" },
  { term: "Autoregressive model", definition: "A model that predicts each token using only the tokens that came before it.", chapter: "pre-training", lesson: "self-supervised-tasks" },
  { term: "BERT", definition: "An encoder-only Transformer pre-trained primarily with masked language modeling.", chapter: "pre-training", lesson: "bert" },
  { term: "Batching", definition: "Processing multiple requests together to improve hardware utilization and throughput.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Chain-of-thought prompting", definition: "Prompting that elicits intermediate reasoning steps before a final answer.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Decoder-only model", definition: "A causal Transformer trained to predict the next token from preceding tokens.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Direct preference optimization (DPO)", definition: "A preference-learning objective that updates a policy directly from chosen and rejected responses.", chapter: "alignment", lesson: "improved-alignment" },
  { term: "Fine-tuning", definition: "Continuing training on task-specific data to adapt some or all model parameters.", chapter: "pre-training", lesson: "applying-bert" },
  { term: "Foundation model", definition: "A broadly trained model intended to support many downstream applications.", chapter: "pre-training", lesson: "pre-training-models" },
  { term: "In-context learning", definition: "Learning the task pattern from instructions or examples placed in the prompt, without updating weights.", chapter: "prompting", lesson: "general-prompt-design" },
  { term: "Inference-time scaling", definition: "Spending more computation during generation to improve the probability of a good answer.", chapter: "inference", lesson: "inference-time-scaling" },
  { term: "Inter-token latency (ITL)", definition: "The elapsed time between consecutively streamed output tokens.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "KV cache", definition: "Stored attention keys and values that prevent recomputing prior-token states during decoding.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Masked language modeling", definition: "Predicting tokens hidden or corrupted in an input sequence.", chapter: "pre-training", lesson: "bert" },
  { term: "Prefilling", definition: "The inference phase that processes all prompt tokens and initializes the attention cache.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Prompt", definition: "The input sequence that conditions a language model's output.", chapter: "prompting", lesson: "general-prompt-design" },
  { term: "Retrieval-augmented generation (RAG)", definition: "Retrieving external evidence and placing it in context before generation.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Reward model", definition: "A learned function that scores responses as a proxy for human preference.", chapter: "alignment", lesson: "rlhf" },
  { term: "RLHF", definition: "Reinforcement learning from human feedback: preference collection, reward modeling, and policy optimization.", chapter: "alignment", lesson: "rlhf" },
  { term: "Scaling law", definition: "An empirical relationship between model performance and resources such as parameters, data, or compute.", chapter: "generative-models", lesson: "training-at-scale" },
  { term: "Self-supervision", definition: "Deriving training targets from the structure or content of unlabeled data itself.", chapter: "pre-training", lesson: "pre-training-models" },
  { term: "Supervised fine-tuning (SFT)", definition: "Training on curated instruction-response demonstrations to make a model follow instructions.", chapter: "alignment", lesson: "instruction-alignment" },
  { term: "Time to first token (TTFT)", definition: "The delay from receiving a request until its first output token becomes available.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Tool use", definition: "Allowing a model to call an external function or service and incorporate the result.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Transformer", definition: "A neural architecture built around attention and repeated processing blocks.", chapter: "pre-training", lesson: "bert" },
];

export function getChapter(chapterSlug: string) {
  return chapters.find((chapter) => chapter.slug === chapterSlug);
}

export function getLesson(chapterSlug: string, lessonSlug: string) {
  return getChapter(chapterSlug)?.lessons.find((item) => item.slug === lessonSlug);
}

export function getLessonNeighbors(chapterSlug: string, lessonSlug: string) {
  const lessons = getChapter(chapterSlug)?.lessons ?? [];
  const index = lessons.findIndex((item) => item.slug === lessonSlug);
  return {
    previous: index > 0 ? lessons[index - 1] : undefined,
    next: index >= 0 && index < lessons.length - 1 ? lessons[index + 1] : undefined,
  };
}

export function getAllLessons() {
  return chapters.flatMap((chapter) => chapter.lessons.map((item) => ({ chapter, lesson: item })));
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
