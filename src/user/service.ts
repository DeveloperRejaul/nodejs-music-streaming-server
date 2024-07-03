import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async create(userData): Promise<any> {
    const product = new User(userData);
    return await product.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async findOne(id: number): Promise<User> {
    return this.userModel.findOne({ where: { id } });
  }

  async update(id: number, userData): Promise<[number, User[]]> {
    const [affectedCount, affectedRows] = await this.userModel.update(userData, {
      where: { id },
      returning: true, 
    });
    return [affectedCount, affectedRows as User[]];
  }

  async remove(id: number): Promise<number> {
    return this.userModel.destroy({ where: { id } });
  }
}