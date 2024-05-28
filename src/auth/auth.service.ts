import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from 'src/auth/model/user/user.model';
import { AuthDto } from './dto/auth.dto';
import { compare, genSalt ,hash} from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(@InjectModel(UserModel) private readonly UserModel:ModelType<UserModel>,private readonly jwtService:JwtService){}

    async login(dto:AuthDto){
    const user = await this.validateUser(dto)
    const tokens = await this.isTokenPair(String(user._id))
    return{
        user:this.returnUserField(user),
        ...tokens,
    }
    }
    async registration(dto:AuthDto){
        const oldUser = await this.UserModel.findOne({email:dto.email})
        if(oldUser) throw new UnauthorizedException('User whith this email alredy in the system')
        const salt = await genSalt(10)
        const newUser = new this.UserModel({email:dto.email,password: await hash(dto.password,salt)})
       const user = await newUser.save()
       const tokens = await this.isTokenPair(String(user._id))
 
        return{
            user:this.returnUserField(user),
            ...tokens,
        }
        }
    async validateUser (dto:AuthDto){
    const user = await this.UserModel.findOne({email:dto.email})
    if(!user) throw new UnauthorizedException('User not Found')

    const isValidPassword = await compare(dto.password,user.password)
    if(!isValidPassword) throw new UnauthorizedException('Password is incorected')
     return user

    }
    async isTokenPair(_id:string){
    const data  = {_id}
    const accessToken= await this.jwtService.signAsync(data,{
        expiresIn:"10d"
    })
    return {accessToken}
    }
    returnUserField(user:UserModel){
        return{
            _id:user._id,
            email:user.email
        }
    }
}
