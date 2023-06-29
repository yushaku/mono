import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateBotDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  model: 'GPT-3.5-TURBO' | 'GPT-4';

  @IsArray()
  knowledge_base: Array<string>;

  @IsString()
  relevance_score: 'Factual' | 'Balanced' | 'Creative';
}
