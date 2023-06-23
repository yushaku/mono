import { FilesService } from './files.service';
import { JwtAuthGuard } from '@/common/guards';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('knowledge')
@UseGuards(JwtAuthGuard)
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

  // @Get()
  // getFile(): StreamableFile {
  //   const file = createReadStream(join(process.cwd(), 'package.json'));
  //   return new StreamableFile(file);
  // }

  @Get()
  getKnowledge() {
    return;
  }
}
