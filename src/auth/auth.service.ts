import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseHelper } from 'src/helper/response.helper';
import { User, } from 'src/users/model/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel : Model<User>,
    @Inject(ResponseHelper) private readonly responseHelper: ResponseHelper,
    private usersService: UsersService,
    private jwtService: JwtService
    ) {
      
    }

 public async validateUser(username: string, password: string): Promise<any> {
      const user = await this.usersService.findOne(username);
     
      if (user && user.email === username) {
        const { password, ...result } = user;
        return result;
      }
      return null;
  }

  generatePayload(user: any) {
    const { _id, fullname, username, email, createdAt } = user;
    return { _id, fullname, username, email,roles : user.roles, joinedAt: createdAt };
  }

  async createToken(payload: any): Promise<string> {
    const token = await this.jwtService.signAsync(payload);
    return token;
  }



 public async login(user : any) {
    const payload = this.generatePayload(user);
    const token = await this.createToken(payload);
    
    const response = {
      access_token: token,
      message: 'Login successful'
    };
  
    return this.responseHelper.createResponse(200, response.message, response);
  }
  

  async register(values : any){
    try{
   
        const user = await this.usersService.findOne(values.email);
    
        if(user){
          return this.responseHelper.createResponse(409, "Your email already exist!");
        }

        const newUser =  await this.userModel.create(values);
      
        const payload = this.generatePayload(newUser);
        const token = await this.createToken(payload);
  
        return this.responseHelper.createResponse(201, "User created successfully", token);

    } catch(error){
      return this.responseHelper.createResponse(500, "Internal server error");
    };

    
  }
}