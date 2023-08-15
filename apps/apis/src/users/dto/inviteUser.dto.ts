import { IsArray } from 'class-validator';

export class InviteUserDto {
  @IsArray()
  emails: string[];
}
