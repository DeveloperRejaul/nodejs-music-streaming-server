import { Module } from '@nestjs/common';
import { UserController } from './controller';
import { UserService } from './service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './model';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [UserController],
  providers:[UserService]
})
export class UserModule {}
