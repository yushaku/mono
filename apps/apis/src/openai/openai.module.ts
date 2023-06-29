import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [OpenaiController],
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
