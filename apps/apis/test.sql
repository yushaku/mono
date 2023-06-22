CREATE TABLE "teams" (
  "id" uuid NOT NULL,
  "created_at" timestamptz(0) NOT NULL,
  "updated_at" timestamptz(0) NOT NULL,
  "name" varchar(255) NULL,
  "vip_plan" varchar(255) NOT NULL,
  CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "chats" (
  "id" uuid NOT NULL,
  "created_at" timestamptz(0) NOT NULL,
  "updated_at" timestamptz(0) NOT NULL,
  "team_id" uuid NOT NULL,
  "title" varchar(255) NULL,
  "is_pin" boolean NOT NULL DEFAULT false,
  CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "message" (
  "id" uuid NOT NULL,
  "created_at" timestamptz(0) NOT NULL,
  "updated_at" timestamptz(0) NOT NULL,
  "chat_id" uuid NOT NULL,
  "question" varchar(255) NULL,
  "bot_answer" varchar(255) NULL,
  "feed_back" varchar(255) NULL,
  CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "bot_knowledge" (
  "id" uuid NOT NULL,
  "created_at" timestamptz(0) NOT NULL,
  "updated_at" timestamptz(0) NOT NULL,
  "bot_id" uuid NOT NULL,
  "Knowledge_id" uuid NOT NULL,
  CONSTRAINT "bot_knowledge_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "content" (
  "id" uuid NOT NULL,
  "created_at" timestamptz(0) NOT NULL,
  "updated_at" timestamptz(0) NOT NULL,
  "team_id" uuid NOT NULL,
  "title" varchar(255) NULL,
  "category" varchar(255) NULL,
  "type" varchar(255) NULL,
  "is_trained" boolean NOT NULL DEFAULT false,
  "file_link" varchar(255) NULL,
  "text" varchar(255) NULL,
  CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "knowledge" (
  "id" uuid NOT NULL,
  "created_at" timestamptz(0) NOT NULL,
  "updated_at" timestamptz(0) NOT NULL,
  "team_id" uuid NOT NULL,
  "title" varchar(255) NULL,
  CONSTRAINT "knowledge_pkey" PRIMARY KEY ("id")
);