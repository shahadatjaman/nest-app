import {  IsNotEmpty } from 'class-validator';

export class LoginDto {
  replace(arg0: string, arg1: string) {
    throw new Error("Method not implemented.");
  }

  @IsNotEmpty()
  public username : string

  @IsNotEmpty()
  public password : string
}