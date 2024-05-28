import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from 'src/auth/model/user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from 'src/config/jwt.config';

@Module({
    imports:[
        TypegooseModule.forFeature([{typegooseClass:UserModel,
            schemaOptions:{
                collection:'User'
            }
        },
    ]),
        ConfigModule,
        JwtModule.registerAsync({
            imports:[ConfigModule],
            inject:[ConfigService],
            useFactory:getJwtConfig
        })
       
    ],
    providers:[AuthService],
    controllers:[AuthController]
})
export class AuthModule {}
