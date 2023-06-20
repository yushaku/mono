import { OpenaiService } from './openai.service';
import { Body, Controller, Post, Query, Sse } from '@nestjs/common';

@Controller('openai')
export class OpenaiController {
  constructor(private readonly openaiService: OpenaiService) {}

  @Post('ask')
  askGpt(@Body() { prompt }: { prompt: string }) {
    return this.openaiService.askGpt(prompt);
  }

  // @Sse('stream')
  @Post('stream')
  gpt(@Query() { prompt }: { prompt: string }) {
    const stream = this.openaiService.streamCompletion(prompt);

    const readableStream = new ReadableStream<string>({
      start(controller) {
        stream.subscribe({
          next(value) {
            controller.enqueue(value as any);
          },
          error(error) {
            controller.error(error);
          },
          complete() {
            controller.close();
          },
        });
      },
    });
    return readableStream;
  }
}
