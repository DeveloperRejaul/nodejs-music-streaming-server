import { Module } from '@nestjs/common';
import { UserModule } from './user/module';
import { AppController } from './controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model';

@Module({
    imports: [
      SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'rejaul1200',
      database: 'my_app',
      synchronize: true,
      autoLoadModels: true,
      models: [User],
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}