import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
