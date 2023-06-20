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
    return this.openai
      .createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      })
      .then((res) => res.data.choices[0].message?.content);
  }

  streamCompletion(prompt: string) {
    return new Observable((subscriber) => {
      this.openai
        .createChatCompletion(
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 100,
            temperature: 0,
            stream: true,
          },
          { responseType: 'stream' },
        )
        .then((res: any) => {
          res.data.on('data', (data: any) => {
            const lines = data
              .toString()
              .split('\n')
              .filter((line: any) => line.trim() !== '');

            for (const line of lines) {
              const message = line.replace(/^data: /, '');
              if (message === '[DONE]') {
                subscriber.complete();
                return;
              }
              try {
                const parsed = JSON.parse(message);
                const data = parsed.choices[0].delta.content;
                // console.log(data);

                subscriber.next({ data });
              } catch (error) {
                console.error('Error parsing AI response:', error);
              }
            }
          });
        });
    });
  }

  stream(prompt: string): Observable<string> {
    return new Observable((subscriber) => {
      this.openai
        .createChatCompletion(
          {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 100,
            temperature: 0,
            stream: true,
          },
          { responseType: 'stream' },
        )
        .then((res: any) => {
          res.data.on('data', (chunk: any) => {
            const data = chunk.toString();

            if (data === '[DONE]') {
              subscriber.complete();
              return;
            }
            try {
              const parsed = JSON.parse(data);
              const text = parsed.choices[0].text.trim();
              console.log(text);

              subscriber.next(text);
            } catch (error) {
              console.error('Error parsing AI response:', error);
            }
          });
        })
        .catch((error) => console.error('Error calling OpenAI API:', error));
    });
  }
}
