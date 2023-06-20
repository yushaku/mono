import { OpenaiService } from './openai.service';
import { Body, Controller, Post, Sse } from '@nestjs/common';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('ask')
  @Sse()
  askGpt(@Body() { prompt }: { prompt: string }) {
    return this.openaiService.askGpt(prompt);
  }
}
