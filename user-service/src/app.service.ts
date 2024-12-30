import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUsers() {
    return this.userModel.find().exec();
  }

  async getUser(userId: string) {
    return this.userModel.findById(userId).exec();
  }
}
