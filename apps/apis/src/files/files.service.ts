import { MinioService } from '@/common/minio.service';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable()
export class FilesService {
  constructor(
    private configService: ConfigService,
    private minioService: MinioService,
  ) {}

  public get isConnected(): boolean {
    return true;
  }

  async upload(file: Express.Multer.File) {
    const storePath = `${this.configService.get('FILE_PATH')}/${
      file.originalname
    }`;
    const writeStream = fs.createWriteStream(storePath);
    writeStream.write(file.buffer);
    writeStream.end();
  }

  async uploadMinio(file: Express.Multer.File) {
    return this.minioService.upload({
      fileName: file.originalname,
      buffer: file.buffer,
    });
  }

  async presignedMinio(fileName: string) {
    return this.minioService.getPresignedUrl(fileName);
  }
}
