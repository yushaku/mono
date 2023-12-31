export type Chats = {
  id: string;
  team_id: string;
  title: string;
  is_pin: boolean;
};

export type Message = {
  chat_id: string;
  question: string;
  bot_answer: string;
};

export type ResponseMessage = Message & {
  id: string;
  created_at: string;
  updated_at: string;
};
