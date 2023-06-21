import { OpenaiService } from './openai.service';
import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('ask')
  askGpt(@Body() { prompt }: { prompt: string }) {
    return this.openaiService.askGpt(prompt);
  }

  @Get('askStream')
  async askStream(
    @Res() response: Response,
    @Query() { prompt }: { prompt: string },
  ) {
    const stream = await this.openaiService.askStream(prompt);

    response.writeHead(200, {
      'Content-Type': 'application/octet-stream',
      'X-Accel-Buffering': 'no',
      'Transfer-Encoding': 'chunked',
    });

    stream.pipe(response);
  }
}
