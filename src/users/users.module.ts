import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Module({
  providers: [UsersService],
  exports : [UsersService]
})
export class UsersModule {}
