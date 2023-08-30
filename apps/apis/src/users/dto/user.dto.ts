import { SubscriptionPlan } from '@/databases/entities';
import { IsEmail, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}

export class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}
