import { Module } from '@nestjs/common';
import { UserModule } from './user/module';
import { AppController } from './controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.HOST,
      port:parseInt(process.env.DATABASE_PORT,10),
      username: process.env.USER_NAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      synchronize: true,
      autoLoadModels: true,
      models: [User],
    }),
   
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
