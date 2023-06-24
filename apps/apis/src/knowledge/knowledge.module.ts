import { KnowledgeController } from './knowledge.controller';
import { KnowledgeService } from './knowledge.service';
import { ContentEntity, KnowledgeEntity } from '@/databases/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature([KnowledgeEntity, ContentEntity])],
  controllers: [KnowledgeController],
  providers: [KnowledgeService],
  exports: [KnowledgeService],
})
export class KnowledgeModule {}
