import { Request } from "express";

export interface RequestWithUser extends Request {
  user: any;
}

export enum PostgresErrorCode {
  UniqueViolation = "23505",
}

export type TokenPayload = {
  team_id: string;
  user_id: string;
};
