import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  title: string;
}

export class UpdateChatDto {
  @IsString()
  title: string;

  @IsString()
  id: string;
}
