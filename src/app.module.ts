import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './config/mongo.config';

@Module({
  imports:[
    ConfigModule.forRoot(),
  TypegooseModule.forRootAsync({
    imports:[ConfigModule],
    inject:[ConfigService],
    useFactory:getMongoConfig
  }),
  AuthModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
