import { FlattenType } from ".";

export type Bot = {
  id: string;
  name: string;
  description: string;
  model: "GPT-3.5-TURBO" | "GPT-4";
  created_at: string;
  knowledge_base: Array<string>;
  relevance_score: "Factual" | "Balanced" | "Creative";
};

export type CreateBotDto = FlattenType<
  Omit<Bot, "id" | "created_at" | "modified_at">
>;

export type UpdateBotDto = CreateBotDto & {
  id: string;
};
