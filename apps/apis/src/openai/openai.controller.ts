import { OpenaiService } from './openai.service';
import { Controller } from '@nestjs/common';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}
}
