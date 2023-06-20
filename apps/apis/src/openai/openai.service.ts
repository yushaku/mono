import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';
import { Observable } from 'rxjs';

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
    await this.openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      })
      .then((res) => console.log(res.data.choices));
  }

  getStreamValue(): Observable<number> {
    return new Observable<number>((observer) => {
      let i = 0;
      const intervalId = setInterval(() => {
        observer.next(i++);
      }, 5000);

      // Clean up function when subscriber unsubscribes
      return () => clearInterval(intervalId);
    });
  }
}
