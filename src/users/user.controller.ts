import { Controller, Get } from "@nestjs/common";
import { UsersService } from "./users.service";


@Controller()
export class UserController {
    constructor(private userService : UsersService){}
}