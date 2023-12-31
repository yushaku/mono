export * from "./blog.types";
export * from "./chats.types";
export * from "./express.types";
export * from "./knowledge.types";
export * from "./user.types";
export * from "./bots.types";

export type Action = "delete" | "update" | "pin";
export type MenuFeatures = { icon: JSX.Element; title: Action }[];
export type FlattenType<T> = Pick<T, keyof T>;
