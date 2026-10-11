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
  lesson("pre-training-models", "1.1", "Pre-training NLP models", "Pre-training models", "Learn why models are pre-trained before adaptation. See where the supervision signal comes from and how fine-tuning is different from prompting.", "16", 14, [["the-two-problems", "What pre-training solves", "1"], ["three-paradigms", "Three supervision paradigms", "2-3"], ["model-families", "Two model families", "3-4"], ["adapting-models", "Fine-tuning", "4-5"], ["prompting-models", "Prompting", "5-6"]]),
  lesson("self-supervised-tasks", "1.2", "Self-supervised pre-training tasks", "Self-supervised tasks", "See how causal, masked, discriminative and denoising objectives change ordinary text into training signals for three Transformer architectures.", "720", 19, [["decoder-only", "Decoder-only pre-training", "7-8"], ["encoder-only", "Encoder-only pre-training", "8-15"], ["encoder-decoder", "Encoder-decoder pre-training", "15-19"], ["denoising-objectives", "Denoising objectives", "19-20"], ["choosing-an-objective", "Comparing objectives", "20"]]),
  lesson("bert", "1.3", "BERT, worked through", "BERT", "Examine the BERT objectives, input format, model sizes, efficient variants and transfer across languages, step by step.", "2129", 18, [["standard-bert", "The standard model", "21-22"], ["training-losses", "MLM and NSP losses", "22-25"], ["model-setup", "Input and model setup", "25-27"], ["masking-lab", "Masking lab", "23-24"], ["scaling-efficiency", "Scaling and efficiency", "27-28"], ["multilingual-models", "Multilingual models", "28-29"]]),
  lesson("applying-bert", "1.4", "Applying BERT models", "Applying BERT", "See how the BERT context vectors become classifiers, regressors, taggers, span predictors and encoders for generation systems.", "3034", 16, [["adaptation-objective", "The adaptation objective", "30-31"], ["classification-regression", "Classification and regression", "31-32"], ["sequence-labeling", "Sequence labeling", "32-33"], ["span-prediction", "Span prediction", "33-34"], ["generative-encoders", "Generation and fine-tuning risks", "34"]]),
  lesson("summary", "1.5", "Chapter summary", "Summary", "Connect supervision, objectives, architectures, BERT and downstream adaptation into one mental model.", "35", 7, [["mental-model", "The full learning pipeline", "35"], ["objective-guide", "Objective and architecture map", "35"], ["adaptation-guide", "Adaptation map", "35"], ["open-problems", "Limits and open problems", "35"], ["next", "What comes next", "35"]]),
];

export const generativeModelLessons = [
  lesson("llm-pipeline", "2.1", "A practical map of large language models", "The LLM pipeline", "Follow a decoder-only Transformer from next-token pre-training to task fine-tuning, alignment and prompting.", "3755", 17, [["decoder-only-transformers", "Decoder-only Transformers", "38-40"], ["training-llms", "Training LLMs", "40-42"], ["fine-tuning-llms", "Fine-tuning LLMs", "42-46"], ["aligning-llms", "Aligning LLMs", "46-51"], ["prompting-llms", "Prompting LLMs", "51-55"]]),
  lesson("training-at-scale", "2.2", "Training at scale", "Training at scale", "See how data preparation, model changes, distributed compute and scaling laws affect each other in large training runs.", "5665", 15, [["data-preparation", "Data preparation", "56-57"], ["model-modifications", "Model changes", "57-60"], ["distributed-training", "Distributed training", "60-63"], ["scaling-laws", "Scaling laws", "63-65"]]),
  lesson("long-sequence-modeling", "2.3", "Long-sequence modeling", "Long sequences", "Learn about efficient attention, caches and external memory, KV sharing and methods that extend positions.", "6693", 21, [["hpc-optimization", "HPC optimization", "67-68"], ["efficient-architectures", "Efficient architectures", "68-70"], ["cache-and-memory", "Cache and memory", "70-79"], ["sharing-heads-layers", "Sharing heads and layers", "79-81"], ["position-methods", "Position extension methods", "81-92"], ["long-context-remarks", "Practical remarks", "92-93"]]),
  lesson("summary", "2.4", "Chapter summary", "Summary", "Connect decoder-only models, scale, systems, memory and long-context adaptation in one design map.", "94", 7, [["mental-model", "The LLM lifecycle", "94"], ["scaling-balance", "Scaling balance", "94"], ["long-context-map", "Long-context map", "94"], ["next", "What comes next", "94"]]),
];

export const promptingLessons = [
  lesson("general-prompt-design", "3.1", "General prompt design", "Prompt design", "Build prompts from clear tasks, structured context, demonstrations, output limits and tested examples.", "97114", 16, [["prompt-basics", "Prompt basics", "97-99"], ["in-context-learning", "In-context learning", "99-101"], ["prompt-strategies", "Prompt strategies", "101-106"], ["task-examples", "Task examples", "106-114"]]),
  lesson("advanced-prompting", "3.2", "Advanced prompting", "Advanced prompting", "Give the model more inference work through reasoning steps, decomposition, refinement, ensembling, retrieval and tools.", "115137", 19, [["chain-of-thought", "Chain of thought", "115-117"], ["problem-decomposition", "Problem decomposition", "117-124"], ["self-refinement", "Self-refinement", "124-130"], ["ensembling", "Ensembling", "130-134"], ["retrieval-and-tools", "RAG and tool use", "134-137"]]),
  lesson("learning-to-prompt", "3.3", "Learning to prompt", "Learning to prompt", "Use optimization to design prompts: search text instructions, learn continuous prompts and decrease the number of tokens.", "138152", 14, [["prompt-optimization", "Prompt optimization", "139-142"], ["soft-prompts", "Soft prompts", "142-151"], ["prompt-compression", "Shorter prompts", "152"]]),
  lesson("summary", "3.4", "Chapter summary", "Summary", "Select the lightest prompt method that gives the task, evidence, compute and validation that a request needs.", "153", 7, [["mental-model", "The prompt as a program", "153"], ["method-guide", "Method selection", "153"], ["evaluation-guide", "Evaluation guide", "153"], ["next", "What comes next", "153"]]),
];

export const alignmentLessons = [
  lesson("alignment-overview", "4.1", "Why alignment is a separate stage", "Alignment overview", "Learn why language-model likelihood is different from good assistant behavior, and how demonstrations and preferences make the gap smaller.", "155156", 8, [["objective-gap", "The objective gap", "155"], ["alignment-pipeline", "The alignment pipeline", "155-156"], ["limits", "What alignment can guarantee", "156"]]),
  lesson("instruction-alignment", "4.2", "Instruction alignment", "Instruction alignment", "Learn about supervised fine-tuning, how to get instruction data, data efficiency, generalization and weak supervision.", "157171", 18, [["supervised-fine-tuning", "Supervised fine-tuning", "157-161"], ["instruction-data", "Data acquisition", "161-166"], ["less-data", "Fine-tuning with less data", "166-167"], ["instruction-generalization", "Instruction generalization", "167-169"], ["weak-to-strong", "Weak-to-strong supervision", "169-171"]]),
  lesson("rlhf", "4.3", "Reinforcement learning from human feedback", "RLHF", "Build RLHF step by step: reinforcement-learning basics, preference collection, reward models and policy optimization with limits.", "172186", 17, [["reinforcement-learning", "Reinforcement-learning basics", "173-179"], ["reward-model", "Training reward models", "179-182"], ["policy-optimization", "Training the language model", "182-186"]]),
  lesson("improved-alignment", "4.4", "Improved alignment methods", "Improved alignment", "Make reward signals better, or replace them with DPO, synthetic preferences, process supervision and selection at inference time.", "187200", 18, [["better-reward-modeling", "Better reward modeling", "187-193"], ["direct-preference-optimization", "Direct preference optimization", "193-196"], ["automatic-preferences", "Automatic preference data", "196-198"], ["stepwise-alignment", "Step-by-step alignment", "198-200"], ["inference-time-alignment", "Inference-time alignment", "200"]]),
  lesson("summary", "4.5", "Chapter summary", "Summary", "Connect demonstrations, preferences, reward models, direct objectives and inference-time controls in one alignment map.", "201202", 7, [["mental-model", "The alignment stack", "201-202"], ["method-guide", "Signal and method guide", "201-202"], ["failure-modes", "Failure modes", "202"], ["next", "What comes next", "202"]]),
];

export const inferenceLessons = [
  lesson("prefilling-and-decoding", "5.1", "Prefilling and decoding", "Prefill and decode", "Follow a request through the inference steps: prompt prefilling, token-by-token decoding, sampling algorithms and serving metrics.", "204221", 18, [["inference-preliminaries", "Inference preliminaries", "204-207"], ["two-phase-inference", "The two-phase framework", "207-211"], ["decoding-algorithms", "Decoding algorithms", "211-220"], ["serving-metrics", "Serving metrics", "221"]]),
  lesson("efficient-inference", "5.2", "Efficient inference", "Efficient inference", "Use prefix and KV caches, continuous batching and model parallelism to balance latency, throughput and memory.", "222233", 16, [["more-caching", "Prefix and KV caching", "223"], ["batching", "Batching", "223-232"], ["parallelism", "Parallelism", "232-233"], ["serving-remarks", "Practical remarks", "233"]]),
  lesson("inference-time-scaling", "5.3", "Inference-time scaling", "Inference-time scaling", "Use more compute at inference time for context, search, output ensembles and reasoning paths that a verifier checks.", "234244", 16, [["context-scaling", "Context scaling", "235-236"], ["search-scaling", "Search scaling", "236-237"], ["output-ensembling", "Output ensembling", "237-238"], ["thinking-paths", "Generate and verify paths", "238-244"]]),
  lesson("summary", "5.4", "Chapter summary", "Summary", "Connect decoding quality, latency, caches, scheduling, parallelism and inference-time compute across the full serving life cycle.", "245246", 7, [["mental-model", "The serving lifecycle", "245-246"], ["metrics-guide", "Metrics guide", "245-246"], ["tradeoffs", "Technique trade-offs", "246"], ["continue", "Continue learning", "246"]]),
];

export const chapters: Chapter[] = [
  { slug: "pre-training", number: 1, title: "Pre-training", description: "Foundation models, learning objectives, BERT and adaptation.", overview: "Before a model can answer a prompt, it must learn a general model of language. Learn how raw text gives its own training signal. See why each architecture learns different skills, and how a general model becomes useful for one task.", status: "available", lessons: preTrainingLessons },
  { slug: "generative-models", number: 2, title: "Generative models", description: "How to build and scale decoder-only language models.", overview: "Start with the next-token objective and go to the full LLM pipeline. Learn about data preparation, distributed training, scaling laws and the architectures that make longer context possible.", status: "available", lessons: generativeModelLessons },
  { slug: "prompting", number: 3, title: "Prompting", description: "Prompt design, reasoning methods, RAG and tool use.", overview: "A prompt is an interface and also a temporary program. Learn how instructions, examples, reasoning methods, retrieved evidence and tools change model behavior. The model weights do not change.", status: "available", lessons: promptingLessons },
  { slug: "alignment", number: 4, title: "Alignment", description: "Instruction tuning, preference learning, RLHF and DPO.", overview: "Pre-training teaches the model how text looks. Alignment teaches the model which responses people prefer. Follow the steps from supervised demonstrations to reward models and direct preference objectives.", status: "available", lessons: alignmentLessons },
  { slug: "inference", number: 5, title: "Inference", description: "Decoding, efficient serving and inference-time scaling.", overview: "LLM serving is a systems problem and also a modeling problem. Learn about prefilling, token-by-token decoding, caches, batches, parallelism and the extra compute that makes answers better at inference time.", status: "available", lessons: inferenceLessons },
];

export const glossary: GlossaryTerm[] = [
  { term: "Adaptation", definition: "A change to a pre-trained model, or to how you use it, so that it does a downstream task.", chapter: "pre-training", lesson: "applying-bert" },
  { term: "Attention", definition: "A mechanism that lets each token combine information from the other visible token positions.", chapter: "pre-training", lesson: "bert" },
  { term: "Autoregressive model", definition: "A model that predicts each token from only the tokens before it.", chapter: "pre-training", lesson: "self-supervised-tasks" },
  { term: "Batching", definition: "The processing of more than one request at the same time, to use the hardware better and increase throughput.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Beam search", definition: "A decoding method that keeps some partial sequences with high scores at each generation step.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "BERT", definition: "An encoder-only Transformer. Its main pre-training objective is masked language modeling.", chapter: "pre-training", lesson: "bert" },
  { term: "Causal language modeling", definition: "Training that teaches a model to predict the next token from only the tokens before it.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Chain-of-thought prompting", definition: "A prompt method that makes the model write intermediate reasoning steps before the final answer.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Continuous batching", definition: "A serving method that adds and removes requests between decoding steps. It does not wait for a fixed batch to finish.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Cross-entropy", definition: "A loss that gives a penalty when the model gives a low probability to the correct token or label.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Data parallelism", definition: "A copy of the model on each device. Each copy processes a different part of a batch or of the request stream.", chapter: "generative-models", lesson: "training-at-scale" },
  { term: "Decoder-only model", definition: "A causal Transformer that learns to predict the next token from the tokens before it.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Denoising objective", definition: "A self-supervised task that damages text and trains a model to rebuild the original content.", chapter: "pre-training", lesson: "self-supervised-tasks" },
  { term: "Direct preference optimization (DPO)", definition: "A preference-learning objective that updates a policy directly from chosen and rejected responses. It does not need a separate reward model.", chapter: "alignment", lesson: "improved-alignment" },
  { term: "Ensembling", definition: "The combination of some generated candidates through voting, ranking or a different aggregation rule.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Few-shot prompting", definition: "A prompt that contains a small number of demonstrations, so that the model can find the task pattern.", chapter: "prompting", lesson: "general-prompt-design" },
  { term: "Fine-tuning", definition: "More training on task-specific data, to adapt some or all of the model parameters.", chapter: "pre-training", lesson: "applying-bert" },
  { term: "Foundation model", definition: "A model with general training that many downstream applications can use.", chapter: "pre-training", lesson: "pre-training-models" },
  { term: "Goodput", definition: "The quantity of useful work that a system completes inside a defined latency or service-level target.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Grouped-query attention (GQA)", definition: "An attention design where groups of query heads share a smaller number of key and value heads. This decreases memory use.", chapter: "generative-models", lesson: "long-sequence-modeling" },
  { term: "In-context learning", definition: "The model finds the task pattern from the instructions or examples in the prompt. The weights do not change.", chapter: "prompting", lesson: "general-prompt-design" },
  { term: "Inference-time scaling", definition: "The use of more compute during generation to increase the probability of a good answer.", chapter: "inference", lesson: "inference-time-scaling" },
  { term: "Instruction tuning", definition: "Fine-tuning on instruction-response demonstrations, so that the model learns to follow requests.", chapter: "alignment", lesson: "instruction-alignment" },
  { term: "Inter-token latency (ITL)", definition: "The time between two output tokens that stream one after the other.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "KL divergence", definition: "A measure of the difference between two probability distributions. Alignment often uses it to stop the policy from moving too far.", chapter: "alignment", lesson: "rlhf" },
  { term: "KV cache", definition: "Stored attention keys and values. During decoding, the model does not have to calculate the states of earlier tokens again.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Masked language modeling", definition: "The prediction of tokens that are hidden or damaged in an input sequence.", chapter: "pre-training", lesson: "bert" },
  { term: "Multi-query attention (MQA)", definition: "An attention design where all query heads share one set of key and value heads.", chapter: "generative-models", lesson: "long-sequence-modeling" },
  { term: "Nucleus sampling", definition: "Sampling from the smallest set of next tokens whose total probability gets to a limit. This limit is called top-p.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Parameter-efficient fine-tuning (PEFT)", definition: "Adaptation that trains a small set of parameters, for example adapters or low-rank updates. Most weights stay frozen.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Pipeline parallelism", definition: "The division of model layers into stages that run on different devices.", chapter: "generative-models", lesson: "training-at-scale" },
  { term: "Policy", definition: "In reinforcement learning, the probability distribution that a language model uses to select actions. The actions are generated tokens.", chapter: "alignment", lesson: "rlhf" },
  { term: "Prefilling", definition: "The inference phase that processes all the prompt tokens and fills the attention cache for the first time.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Prefix caching", definition: "The use of KV states that the system calculated before, for requests that start with the same prompt prefix.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Process supervision", definition: "Feedback on each intermediate reasoning step, not only on the final result.", chapter: "alignment", lesson: "improved-alignment" },
  { term: "Prompt", definition: "The input sequence that controls the output of a language model.", chapter: "prompting", lesson: "general-prompt-design" },
  { term: "Prompt compression", definition: "A method that makes a prompt shorter and tries to keep the information that the task needs.", chapter: "prompting", lesson: "learning-to-prompt" },
  { term: "Rejection sampling", definition: "A method that generates many candidates, gives each one a score and keeps the best candidates.", chapter: "alignment", lesson: "improved-alignment" },
  { term: "Retrieval-augmented generation (RAG)", definition: "A method that finds external evidence and puts it into the context before generation.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Reward hacking", definition: "A policy uses weaknesses in a reward to get a high score, but it does not show the intended behavior.", chapter: "alignment", lesson: "improved-alignment" },
  { term: "Reward model", definition: "A learned function that gives scores to responses. The scores are a proxy for human preference.", chapter: "alignment", lesson: "rlhf" },
  { term: "RLHF", definition: "Reinforcement learning from human feedback. It has three steps: preference collection, reward modeling and policy optimization.", chapter: "alignment", lesson: "rlhf" },
  { term: "Scaling law", definition: "A relation, found by experiment, between model performance and resources, for example parameters, data or compute.", chapter: "generative-models", lesson: "training-at-scale" },
  { term: "Self-consistency", definition: "A method that samples many reasoning paths and selects the answer that most paths agree on.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Self-supervision", definition: "Training targets that come from the structure or content of the unlabeled data itself.", chapter: "pre-training", lesson: "pre-training-models" },
  { term: "Soft prompt", definition: "A learned sequence of continuous embedding vectors that controls a model. It does not change the ordinary text prompt.", chapter: "prompting", lesson: "learning-to-prompt" },
  { term: "Speculative decoding", definition: "A faster draft model proposes tokens, and the target model checks them in parallel.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Supervised fine-tuning (SFT)", definition: "Training on selected instruction-response demonstrations, so that a model follows instructions.", chapter: "alignment", lesson: "instruction-alignment" },
  { term: "Temperature", definition: "A decoding parameter that changes the scale of the logits. It makes the next-token distribution more focused or more diverse.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Tensor parallelism", definition: "The division of the operations and parameters inside one model layer across many devices.", chapter: "inference", lesson: "efficient-inference" },
  { term: "Time to first token (TTFT)", definition: "The time from the arrival of a request until its first output token is available.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Tokenization", definition: "The change of text into the token identifiers that a language model processes.", chapter: "generative-models", lesson: "llm-pipeline" },
  { term: "Tool use", definition: "A model calls an external function or service and uses the result.", chapter: "prompting", lesson: "advanced-prompting" },
  { term: "Top-k sampling", definition: "Sampling of the next token from only the k tokens with the highest probabilities.", chapter: "inference", lesson: "prefilling-and-decoding" },
  { term: "Transformer", definition: "A neural architecture that uses attention and a stack of repeated processing blocks.", chapter: "pre-training", lesson: "bert" },
  { term: "Weak-to-strong supervision", definition: "Feedback from a weaker evaluator makes a stronger model better. The method must also prevent errors from the blind spots of the evaluator.", chapter: "alignment", lesson: "instruction-alignment" },
  { term: "Zero-shot prompting", definition: "A request for a task with instructions but with no demonstrations.", chapter: "prompting", lesson: "general-prompt-design" },
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
