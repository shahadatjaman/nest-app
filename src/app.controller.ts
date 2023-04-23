import { Controller, Get, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AppService } from './app.service';

import { UsersService } from './users/users.service';
import { Roles } from './guards/Roles';
import { UserRole } from './guards/role.enum';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AppController {

  constructor(
    
    private usersService: UsersService,
    private appService: AppService,
    ) {}

  @Get()
  getLove(): string {
    return this.appService.getLove();
  }

  @Get('profile')
  @Roles(UserRole.USER)
  @UseGuards(RolesGuard)
 async getProfile(@Request() req) {
    return req.user;
  }
}
