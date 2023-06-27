import { UserDto } from './user.dto';
import { IsString } from 'class-validator';

export class CreateUserDto extends UserDto {
  @IsString()
  name: string;
}
