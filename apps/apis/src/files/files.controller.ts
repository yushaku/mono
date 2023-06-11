import {
  Body,
  Controller,
  Get,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FilesService } from './files.service';
import { Express } from 'express';
import { Multer } from 'multer';

@Controller('files')
export class FilesController {
  constructor(private uploadService: FilesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const filePath = await this.uploadService.uploadMinio(file);
    return { message: 'success', filePath };
  }

  @Post('/presigned')
  async presignedFile(@Body('fileName') fileName: string) {
    return this.uploadService.presignedMinio(fileName);
  }

  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
}
