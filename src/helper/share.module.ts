import { Module } from '@nestjs/common';
import { ResponseHelper } from './response.helper';

@Module({
  providers: [ResponseHelper],
  exports: [ResponseHelper],
})
export class SharedModule {}
