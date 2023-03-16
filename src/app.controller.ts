import { Controller, Get, Post, Request, SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { LocalAuthGuard } from './auth/local.auth.guard';
import { RolesGuard } from './guards/roles.guard';

@Controller()
export class AppController {
  constructor(
    private appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getLove(): string {
    return this.appService.getLove();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(process.env.DATABASE_USER);
    return req.user;
  }
}
