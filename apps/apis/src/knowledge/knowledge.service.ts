import { CreateProjectDto } from './dto/createProject.dto';
import { MinioService } from '@/common/minio.service';
import { KnowledgeEntity } from '@/databases/entities';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import puppeteer from 'puppeteer';

@Injectable()
export class KnowledgeService {
  constructor(
    private configService: ConfigService,
    private minioService: MinioService,
    @InjectRepository(KnowledgeEntity)
    private projectRepo: EntityRepository<KnowledgeEntity>,
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

  async CrawlWebsite(url: string) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url);

    const element = await page.content();

    const stream = fs.createWriteStream(`./aaa.html`);
    stream.write(element);
    await browser.close();
  }

  async createKnowledge(data: CreateProjectDto & { team_id: string }) {
    return this.projectRepo.create(data);
  }
}
