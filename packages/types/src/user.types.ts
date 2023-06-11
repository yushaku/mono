export type Workspace = {
  name: string;
  version: string;
};

export type User = {
  name: string;
  email: string;
  password: string;
};

export type UserLoginDto = Omit<User, 'name'>;
