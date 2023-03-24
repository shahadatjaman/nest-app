import { Controller, Get, Request } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';

import { Role } from './guards/role.enum';
import { Roles } from './guards/Roles';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
  ) {}

  @Get()
  getLove(): string {
    return this.appService.getLove();
  }

  
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('profile')
  @Roles(Role.User)
  getProfile(@Request() req) {
    return req.user;
  }

}
