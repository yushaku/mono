import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenaiService {
  private openAiConfig: Configuration;
  private openai: OpenAIApi;

  constructor(private configService: ConfigService) {
    this.openAiConfig = new Configuration({
      apiKey: this.configService.get('OPENAI_API_KEY') || '',
    });
    this.openai = new OpenAIApi(this.openAiConfig);
  }

  public get isConnected(): boolean {
    return true;
  }

  async askGpt() {
    await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello world' }],
    });
  }
}
