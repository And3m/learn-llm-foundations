import PreTrainingModels from "@/content/chapters/pre-training/pre-training-models.mdx";
import SelfSupervisedTasks from "@/content/chapters/pre-training/self-supervised-tasks.mdx";
import Bert from "@/content/chapters/pre-training/bert.mdx";
import ApplyingBert from "@/content/chapters/pre-training/applying-bert.mdx";
import PreTrainingSummary from "@/content/chapters/pre-training/summary.mdx";
import LlmPipeline from "@/content/chapters/generative-models/llm-pipeline.mdx";
import TrainingAtScale from "@/content/chapters/generative-models/training-at-scale.mdx";
import LongSequenceModeling from "@/content/chapters/generative-models/long-sequence-modeling.mdx";
import GenerativeSummary from "@/content/chapters/generative-models/summary.mdx";
import GeneralPromptDesign from "@/content/chapters/prompting/general-prompt-design.mdx";
import AdvancedPrompting from "@/content/chapters/prompting/advanced-prompting.mdx";
import LearningToPrompt from "@/content/chapters/prompting/learning-to-prompt.mdx";
import PromptingSummary from "@/content/chapters/prompting/summary.mdx";
import AlignmentOverview from "@/content/chapters/alignment/alignment-overview.mdx";
import InstructionAlignment from "@/content/chapters/alignment/instruction-alignment.mdx";
import Rlhf from "@/content/chapters/alignment/rlhf.mdx";
import ImprovedAlignment from "@/content/chapters/alignment/improved-alignment.mdx";
import AlignmentSummary from "@/content/chapters/alignment/summary.mdx";
import PrefillingAndDecoding from "@/content/chapters/inference/prefilling-and-decoding.mdx";
import EfficientInference from "@/content/chapters/inference/efficient-inference.mdx";
import InferenceTimeScaling from "@/content/chapters/inference/inference-time-scaling.mdx";
import InferenceSummary from "@/content/chapters/inference/summary.mdx";

export const lessonComponents = {
  "pre-training/pre-training-models": PreTrainingModels,
  "pre-training/self-supervised-tasks": SelfSupervisedTasks,
  "pre-training/bert": Bert,
  "pre-training/applying-bert": ApplyingBert,
  "pre-training/summary": PreTrainingSummary,
  "generative-models/llm-pipeline": LlmPipeline,
  "generative-models/training-at-scale": TrainingAtScale,
  "generative-models/long-sequence-modeling": LongSequenceModeling,
  "generative-models/summary": GenerativeSummary,
  "prompting/general-prompt-design": GeneralPromptDesign,
  "prompting/advanced-prompting": AdvancedPrompting,
  "prompting/learning-to-prompt": LearningToPrompt,
  "prompting/summary": PromptingSummary,
  "alignment/alignment-overview": AlignmentOverview,
  "alignment/instruction-alignment": InstructionAlignment,
  "alignment/rlhf": Rlhf,
  "alignment/improved-alignment": ImprovedAlignment,
  "alignment/summary": AlignmentSummary,
  "inference/prefilling-and-decoding": PrefillingAndDecoding,
  "inference/efficient-inference": EfficientInference,
  "inference/inference-time-scaling": InferenceTimeScaling,
  "inference/summary": InferenceSummary,
};
