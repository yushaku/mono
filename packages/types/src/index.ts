export * from "./user.types";
export * from "./express.types";
export * from "./blog.types";
export * from "./chats.types";

export type Action = "delete" | "update" | "pin";
export type MenuFeatures = { icon: JSX.Element; title: Action }[];
