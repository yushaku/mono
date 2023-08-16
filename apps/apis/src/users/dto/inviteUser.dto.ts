import { IsArray } from 'class-validator';

export class InviteUserDto {
  @IsArray()
  emails: string[];
}

export type inviteUserPayload = {
  team_id: string;
  users: InviteUserDto;
};

export type Invitetoken = {
  team_id?: string;
  email: string;
  password: string;
  name?: string;
};
