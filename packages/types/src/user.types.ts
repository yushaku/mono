export type Workspace = {
  name: string;
  version: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type UserAuth = {};

export type UserLoginDto = Omit<User, "name">;
export type UserProfile = Omit<User, "password"> & {
  avata?: string;
  created_at: string;
  updated_at: string;
};

export type TeamInformation = {
  team: Team;
  members: Member[];
};

export type Member = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  avatar: string;
  role: UserRole;
};

export type Team = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  vip_plan: string;
};

export type UserRole = "Owner" | "Member";
