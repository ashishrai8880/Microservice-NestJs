import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'get_users' })
  async getUsers() {
    return this.appService.getUsers();
  }

  @MessagePattern({ cmd: 'get_single_user' })
  async getUser(data: { id: string }) {
    // return this.appService.getUser(data.userId);
    return { message: ` You have searched for ${data.id}` };
  }

  @MessagePattern({ cmd: 'get_user_product' })
  async getUserProduct(data: { userId: string }) {
    return this.appService.getUser(data.userId);
  }
}
