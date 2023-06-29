import { OpenaiController } from './openai.controller';
import { OpenaiService } from './openai.service';
import { BotEntity } from '@/databases/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature([BotEntity])],
  controllers: [OpenaiController],
  providers: [OpenaiService],
  exports: [OpenaiService],
})
export class OpenaiModule {}
