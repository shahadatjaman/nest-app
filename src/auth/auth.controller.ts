import { Body, Controller,Post, UseGuards, Req } from "@nestjs/common/";
import { LoginDto } from "src/users/dto/login.dto";
import { RegisterDto } from "src/users/dto/register.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local.auth.guard";


@Controller()
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Body() body : LoginDto, @Req() req : any)  {
    
    return this.authService.login(req.user);
  }

  @Post('auth/register')
  async register(@Body() body : RegisterDto) {
    const userObj : any = JSON.parse(JSON.stringify(body));
    return this.authService.register(userObj);
  }
  
}