import { UserDto } from './user.dto';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto extends UserDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  team_id?: string;
}
