import { Module } from '@nestjs/common';
import { UserModule } from './user/module';
import { AppController } from './controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/model';
import { ConfigModule } from '@nestjs/config';
import { MusicModule } from './music/module';
import { FavoriteModule } from './favorite/module';
import { Music } from './music/model';
import { Favorite } from './favorite/model';

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
      models: [User, Music, Favorite],
    }),
   
    UserModule,
    MusicModule,
    FavoriteModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
