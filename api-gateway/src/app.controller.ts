import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('api')
export class AppController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
    @Inject('PRODUCT_SERVICE') private readonly productService: ClientProxy,
  ) {}

  @Get('users')
  async getUsers() {
    return this.userService.send({ cmd: 'get_users' }, {});
  }

  @Get('user/:id')
  async getUser(@Param('id') id: string) {
    return this.userService.send({ cmd: 'get_single_user' }, { id: id });
  }

  @Get('products')
  async getProducts() {
    return this.productService.send({ cmd: 'get_products' }, {});
  }

  @Get('user-products')
  async getUserWithProducts(@Query('userId') userId: string) {
    const user = await this.userService
      .send({ cmd: 'get_user' }, { userId })
      .toPromise();
    const products = await this.productService
      .send({ cmd: 'get_products' }, {})
      .toPromise();
    return { user, products };
  }
}
