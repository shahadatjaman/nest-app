import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, } from 'src/users/model/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel : Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
    
    ) {}

  async validateUser(username: string, pass: string): Promise<any> {
      const user = await this.usersService.findOne(username);

      if (user && user.password === pass) {
        const { password, ...result } = user;
        return result;
      }
      return null;
  }

  generatePayload(user: any) {
    const { _id, fullname, username, email, createdAt } = user;
    return { _id, fullname, username, email, joinedAt: createdAt };
  }

  async createToken(payload: any): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  generateResponse(token: string, message?: string, status?: number) {
    return {
      status: status || 200,
      message: message,
      access_token: token
    };
  }

  async login(user: any) {
    const payload = this.generatePayload(user);
    
    const token = this.createToken(payload)
   return this.generateResponse(await token,'Welcome aboard! Your account has been successfully created!')
  }

  async register(user : any){
    
    this.userModel.create(user)
    const payload = this.generatePayload(user)
    const token = this.createToken(payload)

    return this.generateResponse(await token,'Welcome aboard! Your account has been successfully created!')
  }
}