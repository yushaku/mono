import { IsString } from 'class-validator';

export class InviteUserDto {
  @IsString()
  email: string;
}
