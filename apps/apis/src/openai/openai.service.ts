import { CreateBotDto } from './dto/bot.dto';
import { BotEntity } from '@/databases/entities';
import { EntityRepository as ER } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { Stream } from 'stream';

@Injectable()
export class OpenaiService {
  private openAiConfig: Configuration;
  private openai: OpenAIApi;

  constructor(
    @InjectRepository(BotEntity) private botRepo: ER<BotEntity>,
    private configService: ConfigService,
    private em: EntityManager,
  ) {
    this.openAiConfig = new Configuration({
      apiKey: this.configService.get('OPENAI_API_KEY') || '',
    });
    this.openai = new OpenAIApi(this.openAiConfig);
  }

  public get isConnected(): boolean {
    return true;
  }

  async askGpt(prompt: string) {
    return this.openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      })
      .then((res) => res.data.choices[0].message?.content);
  }

  async listModel() {
    return this.openai.listModels().then((res) => res.data);
  }

  async askStream(prompt: string) {
    const res = await this.openai.createChatCompletion(
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 500,
        temperature: 0,
        stream: true,
      },
      { responseType: 'stream' },
    );
    const stream = res.data as unknown as Stream;
    return stream;
  }

  async genImage(prompt: string) {
    const res = await this.openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const href = res.data.data[0].url;
    console.log(href);
    return href;
  }

  // BOTS APIS

  async getAll(team_id: string) {
    return this.botRepo.find(
      { team_id },
      {
        fields: ['id', 'name', 'description', 'model', 'created_at'],
        orderBy: { created_at: 'DESC' },
      },
    );
  }

  async createBot(data: CreateBotDto & { team_id: string }) {
    const bot = this.botRepo.create({ ...data });
    await this.botRepo.persistAndFlush(bot);
    return bot;
  }

  async delete(id: string) {
    const query = this.em.createQueryBuilder(BotEntity);
    return query.delete().where({ id }).execute('run');
  }
}
