import { Injectable } from '@nestjs/common';

export const importDynamic = new Function(
  'modulePath',
  'return import(modulePath)',
);

export type CustomResponse<T> = {
  payload: T;
};

@Injectable()
export class AppService {
  api: any;

  async onModuleInit() {
    await this.initGPT();
  }

  async initGPT() {
    const { ChatGPTAPI } = await importDynamic('chatgpt');

    this.api = new ChatGPTAPI({
      apiKey: process.env.OPEN_AI_API_KEY,
    });
  }

  async generateUserStory(search: string): Promise<CustomResponse<string>> {
    const searchTerm = `Generate in bullet form a detailed user story for ${search}`;
    const res = await this.api.sendMessage(searchTerm);
    console.log(res.text);
    return {
      payload: res.text,
    };
  }
}
