export type Lesson = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  sourcePages: string;
  readingMinutes: number;
  sections: { id: string; label: string; sourcePages?: string }[];
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
  sections: ([string, string] | [string, string, string])[],
): Lesson => ({
  slug, number, title, shortTitle, description, sourcePages: sourcePages.replace(/\u0013/g, "-"), readingMinutes,
  sections: sections.map(([id, label, sectionPages]) => ({ id, label, sourcePages: sectionPages })),
});

export const preTrainingLessons = [
  lesson("pre-training-models", "1.1", "Pre-training NLP models", "Pre-training models", "Why reusable language models are trained before adaptation, where their supervision comes from, and how fine-tuning differs from prompting.", "16", 14, [["the-two-problems", "What pre-training solves", "1"], ["three-paradigms", "Three supervision paradigms", "2-3"], ["model-families", "Two model families", "3-4"], ["adapting-models", "Fine-tuning", "4-5"], ["prompting-models", "Prompting", "5-6"]]),
  lesson("self-supervised-tasks", "1.2", "Self-supervised pre-training tasks", "Self-supervised tasks", "How causal, masked, discriminative, and denoising objectives turn ordinary text into training signals for three Transformer architectures.", "720", 19, [["decoder-only", "Decoder-only pre-training", "7-8"], ["encoder-only", "Encoder-only pre-training", "8-15"], ["encoder-decoder", "Encoder-decoder pre-training", "15-19"], ["denoising-objectives", "Denoising objectives", "19-20"], ["choosing-an-objective", "Comparing objectives", "20"]]),
  lesson("bert", "1.3", "BERT, worked through", "BERT", "A detailed walkthrough of BERT's objectives, input representation, model sizes, efficient variants, and multilingual transfer.", "2129", 18, [["standard-bert", "The standard model", "21-22"], ["training-losses", "MLM and NSP losses", "22-25"], ["model-setup", "Input and model setup", "25-27"], ["masking-lab", "Masking lab", "23-24"], ["scaling-efficiency", "Scaling and efficiency", "27-28"], ["multilingual-models", "Multilingual models", "28-29"]]),
  lesson("applying-bert", "1.4", "Applying BERT models", "Applying BERT", "How BERT's contextual vectors become classifiers, regressors, taggers, span predictors, and encoders for generation systems.", "3034", 16, [["adaptation-objective", "The adaptation objective", "30-31"], ["classification-regression", "Classification and regression", "31-32"], ["sequence-labeling", "Sequence labeling", "32-33"], ["span-prediction", "Span prediction", "33-34"], ["generative-encoders", "Generation and fine-tuning risks", "34"]]),
  lesson("summary", "1.5", "Chapter summary", "Summary", "Connect supervision, objectives, architectures, BERT, and downstream adaptation into one source-aligned mental model.", "35", 7, [["mental-model", "The full learning pipeline", "35"], ["objective-guide", "Objective and architecture map", "35"], ["adaptation-guide", "Adaptation map", "35"], ["open-problems", "Limits and open problems", "35"], ["next", "What comes next", "35"]]),
];

export const generativeModelLessons = [
  lesson("llm-pipeline", "2.1", "A practical map of large language models", "The LLM pipeline", "Follow a decoder-only Transformer from next-token pre-training through task fine-tuning, alignment, and prompt-based use.", "3755", 17, [["decoder-only-transformers", "Decoder-only Transformers", "38-40"], ["training-llms", "Training LLMs", "40-42"], ["fine-tuning-llms", "Fine-tuning LLMs", "42-46"], ["aligning-llms", "Aligning LLMs", "46-51"], ["prompting-llms", "Prompting LLMs", "51-55"]]),
  lesson("training-at-scale", "2.2", "Training at scale", "Training at scale", "How data preparation, model modifications, distributed computation, and scaling laws interact in large training runs.", "5665", 15, [["data-preparation", "Data preparation", "56-57"], ["model-modifications", "Model modifications", "57-60"], ["distributed-training", "Distributed training", "60-63"], ["scaling-laws", "Scaling laws", "63-65"]]),
  lesson("long-sequence-modeling", "2.3", "Long-sequence modeling", "Long sequences", "A source-aligned guide to efficient attention, cache and external memory, KV sharing, and positional extension methods.", "6693", 21, [["hpc-optimization", "HPC optimization", "67-68"], ["efficient-architectures", "Efficient architectures", "68-70"], ["cache-and-memory", "Cache and memory", "70-79"], ["sharing-heads-layers", "Sharing heads and layers", "79-81"], ["position-methods", "Position extension", "81-92"], ["long-context-remarks", "Practical remarks", "92-93"]]),
  lesson("summary", "2.4", "Chapter summary", "Summary", "Connect decoder-only modeling, scale, systems, memory, and long-context adaptation in one design map.", "94", 7, [["mental-model", "The LLM lifecycle", "94"], ["scaling-balance", "Scaling balance", "94"], ["long-context-map", "Long-context map", "94"], ["next", "What comes next", "94"]]),
];

export const promptingLessons = [
  lesson("general-prompt-design", "3.1", "General prompt design", "Prompt design", "Build prompts from explicit tasks, structured context, demonstrations, output constraints, and tested examples.", "97114", 16, [["prompt-basics", "Prompt basics", "97-99"], ["in-context-learning", "In-context learning", "99-101"], ["prompt-strategies", "Prompt strategies", "101-106"], ["task-examples", "Task examples", "106-114"]]),
  lesson("advanced-prompting", "3.2", "Advanced prompting", "Advanced prompting", "Allocate more inference work through reasoning traces, decomposition, refinement, ensembling, retrieval, and tools.", "115137", 19, [["chain-of-thought", "Chain of thought", "115-117"], ["problem-decomposition", "Problem decomposition", "117-124"], ["self-refinement", "Self-refinement", "124-130"], ["ensembling", "Ensembling", "130-134"], ["retrieval-and-tools", "RAG and tool use", "134-137"]]),
  lesson("learning-to-prompt", "3.3", "Learning to prompt", "Learning to prompt", "Treat prompt design as optimization over discrete instructions, learned continuous prompts, and token-budget reduction.", "138152", 14, [["prompt-optimization", "Prompt optimization", "139-142"], ["soft-prompts", "Soft prompts", "142-151"], ["prompt-compression", "Prompt length reduction", "152"]]),
  lesson("summary", "3.4", "Chapter summary", "Summary", "Choose the lightest prompt method that supplies the task, evidence, computation, and validation a request needs.", "153", 7, [["mental-model", "The prompt as a program", "153"], ["method-guide", "Method selection", "153"], ["evaluation-guide", "Evaluation guide", "153"], ["next", "What comes next", "153"]]),
];

export const alignmentLessons = [
  lesson("alignment-overview", "4.1", "Why alignment is a separate stage", "Alignment overview", "Why language-model likelihood differs from desired assistant behavior, and how demonstrations and preferences narrow that gap.", "155156", 8, [["objective-gap", "The objective gap", "155"], ["alignment-pipeline", "The alignment pipeline", "155-156"], ["limits", "What alignment can guarantee", "156"]]),
  lesson("instruction-alignment", "4.2", "Instruction alignment", "Instruction alignment", "A detailed guide to supervised fine-tuning, instruction-data acquisition, data efficiency, generalization, and weak supervision.", "157171", 18, [["supervised-fine-tuning", "Supervised fine-tuning", "157-161"], ["instruction-data", "Data acquisition", "161-166"], ["less-data", "Fine-tuning with less data", "166-167"], ["instruction-generalization", "Instruction generalization", "167-169"], ["weak-to-strong", "Weak-to-strong supervision", "169-171"]]),
  lesson("rlhf", "4.3", "Reinforcement learning from human feedback", "RLHF", "Build RLHF from reinforcement-learning fundamentals through preference collection, reward modeling, and constrained policy optimization.", "172186", 17, [["reinforcement-learning", "Reinforcement-learning basics", "173-179"], ["reward-model", "Training reward models", "179-182"], ["policy-optimization", "Training the language model", "182-186"]]),
  lesson("improved-alignment", "4.4", "Improved alignment methods", "Improved alignment", "Improve reward signals or bypass them with DPO, synthetic preferences, process supervision, and inference-time selection.", "187200", 18, [["better-reward-modeling", "Better reward modeling", "187-193"], ["direct-preference-optimization", "Direct preference optimization", "193-196"], ["automatic-preferences", "Automatic preference data", "196-198"], ["stepwise-alignment", "Step-by-step alignment", "198-200"], ["inference-time-alignment", "Inference-time alignment", "200"]]),
  lesson("summary", "4.5", "Chapter summary", "Summary", "Relate demonstrations, preferences, reward models, direct objectives, and inference-time controls in one alignment map.", "201202", 7, [["mental-model", "The alignment stack", "201-202"], ["method-guide", "Signal and method guide", "201-202"], ["failure-modes", "Failure modes", "202"], ["next", "What comes next", "202"]]),
];

export const inferenceLessons = [
  lesson("prefilling-and-decoding", "5.1", "Prefilling and decoding", "Prefill and decode", "Follow a request through inference preliminaries, prompt prefilling, autoregressive decoding, sampling algorithms, and serving metrics.", "204221", 18, [["inference-preliminaries", "Inference preliminaries", "204-207"], ["two-phase-inference", "The two-phase framework", "207-211"], ["decoding-algorithms", "Decoding algorithms", "211-220"], ["serving-metrics", "Inference metrics", "221"]]),
  lesson("efficient-inference", "5.2", "Efficient inference", "Efficient inference", "Use prefix and KV caches, continuous batching, and model parallelism to balance latency, throughput, and memory.", "222233", 16, [["more-caching", "More caching", "223"], ["batching", "Batching", "223-232"], ["parallelism", "Parallelization", "232-233"], ["serving-remarks", "Practical remarks", "233"]]),
  lesson("inference-time-scaling", "5.3", "Inference-time scaling", "Inference-time scaling", "Allocate additional computation to context, search, output ensembles, and generated reasoning paths with verification.", "234244", 16, [["context-scaling", "Context scaling", "235-236"], ["search-scaling", "Search scaling", "236-237"], ["output-ensembling", "Output ensembling", "237-238"], ["thinking-paths", "Generate and verify paths", "238-244"]]),
  lesson("summary", "5.4", "Chapter summary", "Summary", "Connect decoding quality, latency, caches, scheduling, parallelism, and inference-time computation across the full serving lifecycle.", "245246", 7, [["mental-model", "The serving lifecycle", "245-246"], ["metrics-guide", "Metrics guide", "245-246"], ["tradeoffs", "Technique trade-offs", "246"], ["continue", "Continue learning", "246"]]),
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
  { term: "Attention", definition: "A mechanism that lets each token combine information from other visible token positions.", chapter: "pre-training", lesson: "bert" },
  { term: "Autoregressive model", definition: "A model that predicts each token using only the tokens that came before it.", chapter: "pre-training", lesson: "self-supervised-tasks" },
  { term: "Batching", definition: "Processing multiple requests together to improve hardware utilization and throughput.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Beam search", definition: "A decoding method that retains several high-scoring partial sequences at each generation step.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "BERT", definition: "An encoder-only Transformer pre-trained primarily with masked language modeling.", chapter: "pre-training", lesson: "bert" },
  { term: "Causal language modeling", definition: "Training a model to predict the next token using only the preceding token sequence.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Chain-of-thought prompting", definition: "Prompting that elicits intermediate reasoning steps before a final answer.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Continuous batching", definition: "A serving strategy that adds and removes requests between decoding steps instead of waiting for a fixed batch to finish.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Cross-entropy", definition: "A loss that penalizes low probability assigned to the correct target token or label.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Data parallelism", definition: "Replicating a model across devices so each replica processes a different portion of a batch or request stream.", chapter: "generative-models", lesson: "training-at-scale" },
  { term: "Decoder-only model", definition: "A causal Transformer trained to predict the next token from preceding tokens.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Denoising objective", definition: "A self-supervised task that corrupts text and trains a model to reconstruct the original content.", chapter: "pre-training", lesson: "self-supervised-tasks" },
  { term: "Direct preference optimization (DPO)", definition: "A preference-learning objective that updates a policy directly from chosen and rejected responses.", chapter: "alignment", lesson: "improved-alignment" },
  { term: "Ensembling", definition: "Combining several generated candidates through voting, ranking, or another aggregation rule.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Few-shot prompting", definition: "Providing a small number of demonstrations in the prompt so the model can infer the task pattern.", chapter: "prompting", lesson: "general-prompt-design" },
  { term: "Fine-tuning", definition: "Continuing training on task-specific data to adapt some or all model parameters.", chapter: "pre-training", lesson: "applying-bert" },
  { term: "Foundation model", definition: "A broadly trained model intended to support many downstream applications.", chapter: "pre-training", lesson: "pre-training-models" },
  { term: "Goodput", definition: "The amount of useful work completed while satisfying a defined latency or service-level target.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Grouped-query attention (GQA)", definition: "An attention design in which groups of query heads share fewer key and value heads to reduce memory use.", chapter: "generative-models", lesson: "long-sequence-modeling" },
  { term: "In-context learning", definition: "Learning the task pattern from instructions or examples placed in the prompt, without updating weights.", chapter: "prompting", lesson: "general-prompt-design" },
  { term: "Inference-time scaling", definition: "Spending more computation during generation to improve the probability of a good answer.", chapter: "inference", lesson: "inference-time-scaling" },
  { term: "Instruction tuning", definition: "Fine-tuning a model on instruction-response demonstrations so it learns to follow requests.", chapter: "alignment", lesson: "instruction-alignment" },
  { term: "Inter-token latency (ITL)", definition: "The elapsed time between consecutively streamed output tokens.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "KL divergence", definition: "A measure of how one probability distribution differs from another, often used to limit policy drift during alignment.", chapter: "alignment", lesson: "rlhf" },
  { term: "KV cache", definition: "Stored attention keys and values that prevent recomputing prior-token states during decoding.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Masked language modeling", definition: "Predicting tokens hidden or corrupted in an input sequence.", chapter: "pre-training", lesson: "bert" },
  { term: "Multi-query attention (MQA)", definition: "An attention design in which all query heads share one set of key and value heads.", chapter: "generative-models", lesson: "long-sequence-modeling" },
  { term: "Nucleus sampling", definition: "Sampling from the smallest set of next tokens whose cumulative probability reaches a threshold called top-p.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Parameter-efficient fine-tuning (PEFT)", definition: "Adapting a model by training a small parameter subset, such as adapters or low-rank updates, while most weights remain frozen.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Pipeline parallelism", definition: "Splitting model layers into stages that execute on different devices.", chapter: "generative-models", lesson: "training-at-scale" },
  { term: "Policy", definition: "The probability distribution a language model uses to choose actions, represented by generated tokens, during reinforcement learning.", chapter: "alignment", lesson: "rlhf" },
  { term: "Prefilling", definition: "The inference phase that processes all prompt tokens and initializes the attention cache.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Prefix caching", definition: "Reusing previously computed KV states for requests that share an identical prompt prefix.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Process supervision", definition: "Providing feedback on intermediate reasoning steps instead of judging only the final result.", chapter: "alignment", lesson: "improved-alignment" },
  { term: "Prompt", definition: "The input sequence that conditions a language model's output.", chapter: "prompting", lesson: "general-prompt-design" },
  { term: "Prompt compression", definition: "Reducing prompt length while attempting to preserve the information needed to perform the task.", chapter: "prompting", lesson: "learning-to-prompt" },
  { term: "Rejection sampling", definition: "Generating multiple candidates, scoring them, and retaining the strongest candidate or selected examples.", chapter: "alignment", lesson: "improved-alignment" },
  { term: "Retrieval-augmented generation (RAG)", definition: "Retrieving external evidence and placing it in context before generation.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Reward hacking", definition: "Exploiting weaknesses in a learned or specified reward to achieve a high score without the intended behavior.", chapter: "alignment", lesson: "improved-alignment" },
  { term: "Reward model", definition: "A learned function that scores responses as a proxy for human preference.", chapter: "alignment", lesson: "rlhf" },
  { term: "RLHF", definition: "Reinforcement learning from human feedback: preference collection, reward modeling, and policy optimization.", chapter: "alignment", lesson: "rlhf" },
  { term: "Scaling law", definition: "An empirical relationship between model performance and resources such as parameters, data, or compute.", chapter: "generative-models", lesson: "training-at-scale" },
  { term: "Self-consistency", definition: "Sampling multiple reasoning paths and selecting the answer supported by the strongest agreement.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Self-supervision", definition: "Deriving training targets from the structure or content of unlabeled data itself.", chapter: "pre-training", lesson: "pre-training-models" },
  { term: "Soft prompt", definition: "A learned sequence of continuous embedding vectors that conditions a model without editing its ordinary text prompt.", chapter: "prompting", lesson: "learning-to-prompt" },
  { term: "Speculative decoding", definition: "Using a faster draft model to propose tokens that a target model verifies in parallel.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Supervised fine-tuning (SFT)", definition: "Training on curated instruction-response demonstrations to make a model follow instructions.", chapter: "alignment", lesson: "instruction-alignment" },
  { term: "Temperature", definition: "A decoding parameter that rescales logits to make the next-token distribution more concentrated or more diverse.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Tensor parallelism", definition: "Splitting the operations and parameters within a model layer across multiple devices.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Time to first token (TTFT)", definition: "The delay from receiving a request until its first output token becomes available.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Tokenization", definition: "Converting text into the discrete token identifiers processed by a language model.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Tool use", definition: "Allowing a model to call an external function or service and incorporate the result.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Top-k sampling", definition: "Restricting next-token sampling to the k tokens with the highest probabilities.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Transformer", definition: "A neural architecture built around attention and repeated processing blocks.", chapter: "pre-training", lesson: "bert" },
  { term: "Weak-to-strong supervision", definition: "Using feedback from a weaker evaluator to improve a more capable model while guarding against evaluator blind spots.", chapter: "alignment", lesson: "instruction-alignment" },
  { term: "Zero-shot prompting", definition: "Requesting a task with instructions but without including worked demonstrations.", chapter: "prompting", lesson: "general-prompt-design" },
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
