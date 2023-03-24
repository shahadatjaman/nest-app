import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { User, UserSchema} from 'src/users/model/user.schema';
import { Jwtconfig } from './jwt.register';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: Jwtconfig,
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{name : User.name, schema : UserSchema}]),
    UsersModule,
    PassportModule,
  ],
  controllers : [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService,JwtModule],
})
export class AuthModule {}
