import { OpenaiService } from './openai.service';
import { Controller, Get } from '@nestjs/common';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get('listModel')
  listModel() {
    return this.openaiService.listModel();
  }
}
