import { Module } from '@nestjs/common';
import { ImageGenerationService } from './image-generation.service';
import { ImageGenerationController } from './image-generation.controller';

@Module({
  providers: [ImageGenerationService],
  controllers: [ImageGenerationController]
})
export class ImageGenerationModule {}
