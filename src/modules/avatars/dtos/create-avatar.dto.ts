import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateAvatarDto {
  @IsNotEmpty()
  _id?: ObjectId;

  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  path: string;
}
