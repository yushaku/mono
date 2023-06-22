import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { Stream } from 'stream';

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
        max_tokens: 100,
        temperature: 0,
        stream: true,
      },
      { responseType: 'stream' },
    );
    return res.data as unknown as Stream;
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
}
