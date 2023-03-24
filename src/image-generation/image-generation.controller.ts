import { Body, Controller, Get,  Req,  Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { ImageGenationDto } from './dto/image-generation.dto';
import { ImageGenerationService } from './image-generation.service';

@Controller('image_genaration')
export class ImageGenerationController {
    constructor(
        private imageGenerationService: ImageGenerationService,
      ) {}

  @Get('avatar')
   getAvatar( @Body() body : ImageGenationDto){
      const data : any = JSON.parse(JSON.stringify(body));
      
      return this.imageGenerationService.getAvatar(data.text)
    }
}
