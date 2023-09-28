import { IsEmail, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateUserDto {
  @IsNotEmpty()
  _id?: ObjectId;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsUrl()
  avatar: string;
}
