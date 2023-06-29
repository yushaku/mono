import { IsString, IsOptional } from 'class-validator';
import { ActionType } from 'types';

export class CreateContentDto {
  @IsString()
  knowledge_id: string;

  @IsString()
  title: string;

  @IsString()
  type: ActionType;

  @IsOptional()
  @IsString()
  file_link: string;

  @IsOptional()
  @IsString()
  text: string;
}

export class UpdateContentDto {
  @IsString()
  id: string;

  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  file_link?: string;

  @IsString()
  @IsOptional()
  text?: string;
}
