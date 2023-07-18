import { FlattenType } from ".";

export type Bot = {
  id: string;
  name: string;
  description: string;
  model: "GPT-3.5-TURBO" | "GPT-4";
  created_at: string;
};

export type CreateBotDto = FlattenType<
  Omit<Bot, "id" | "created_at" | "modified_at" | "gpt"> & {
    gpt_name: "GPT-3.5" | "GPT-4";
  }
>;
