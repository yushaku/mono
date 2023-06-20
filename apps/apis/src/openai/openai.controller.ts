import { OpenaiService } from './openai.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Get('stream')
  getStream() {
    return this.openaiService.getStreamValue().subscribe((value) => ({
      data: value,
    }));
  }

  @Post('ask')
  askGpt(@Body() { prompt }: { prompt: string }) {
    return this.openaiService.askGpt(prompt);
  }
}
