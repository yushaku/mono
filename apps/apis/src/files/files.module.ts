import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ContentEntity, KnowledgeEntity } from '@/databases/entities';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [MikroOrmModule.forFeature([KnowledgeEntity, ContentEntity])],
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
