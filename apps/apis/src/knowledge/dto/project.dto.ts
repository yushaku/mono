import { IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;
}

export class UpdateProjectDto extends CreateProjectDto {
  @IsString()
  id: string;
}
