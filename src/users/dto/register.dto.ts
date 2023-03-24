import {  IsNotEmpty, IsString,IsEmail, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  replace(arg0: string, arg1: string) {
    throw new Error("Method not implemented.");
  }
  
  @IsString()
  @IsNotEmpty()
  public fullname: string;

  @IsString()
  @IsNotEmpty()
  public username : string

  @IsString()
  @IsEmail()
  public email: string;

  @IsStrongPassword()
  public password : string
}