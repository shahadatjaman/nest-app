import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/model/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel : Model<User>,
    
    ) {}


  public  async findOne(email: string) {

    return this.userModel.findOne({email});
  }
};