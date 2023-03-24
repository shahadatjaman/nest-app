import {  IsNotEmpty } from 'class-validator';

export class ImageGenationDto {
  replace(arg0: string, arg1: string) {
    throw new Error("Method not implemented.");
  }

  @IsNotEmpty()
  public text : string
}