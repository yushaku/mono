export type Bot = {
  id: string;
  name: string;
  description: string;
  model: "GPT-3.5-TURBO" | "GPT-4";
  created_at: string;
};
