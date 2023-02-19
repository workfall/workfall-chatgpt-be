import { Controller, Get, Query } from '@nestjs/common';
import { AppService, CustomResponse } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/generate-user-story')
  async getUserStory(
    @Query('search') search: string,
  ): Promise<CustomResponse<string>> {
    return await this.appService.generateUserStory(search);
  }
}
