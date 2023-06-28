import { MinioService } from '@/common/minio.service';
import { ContentEntity, KnowledgeEntity } from '@/databases/entities';
import { EntityRepository as ER } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as _ from 'lodash';
import puppeteer from 'puppeteer';
import { CreateProjectDto, UpdateProjectDto } from 'types';

@Injectable()
export class KnowledgeService {
  constructor(
    @InjectRepository(KnowledgeEntity) private projectRepo: ER<KnowledgeEntity>,
    private em: EntityManager,
    private configService: ConfigService,
    private minioService: MinioService,
  ) {}

  public get isConnected(): boolean {
    return true;
  }

  async createKnowledge(data: CreateProjectDto & { team_id: string }) {
    const knowledge = this.projectRepo.create(data);
    await this.projectRepo.persistAndFlush(knowledge);
    return knowledge;
  }

  async getAll(team_id: string) {
    return this.projectRepo.find(
      { team_id },
      {
        fields: ['title', 'createdAt', 'updatedAt'],
        orderBy: { createdAt: 'DESC' },
      },
    );
  }

  async updateTitle(projectDto: UpdateProjectDto) {
    const query = this.em.createQueryBuilder(KnowledgeEntity);
    return query
      .update({ title: projectDto.title })
      .where({ id: projectDto.id })
      .execute('run');
  }

  async delete(id: string) {
    const contentQuery = this.em.createQueryBuilder(ContentEntity);
    const contentList = await contentQuery
      .select(['id'])
      .where({ knowledge_id: id })
      .execute('run')
      .then((data) => data.rows as { total: number }[]);

    if (!_.isEmpty(contentList))
      throw new ForbiddenException('Can not remove unempty project');

    const klQuery = this.em.createQueryBuilder(KnowledgeEntity);
    return klQuery.delete().where({ id }).execute('run');
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
}
