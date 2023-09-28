import { HttpService } from '@nestjs/axios';
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async getUserDataById(userId: number): Promise<any> {
    const response = await this.httpService
      .get(`https://reqres.in/api/users/${userId}`)
      .toPromise();

    const userData = response.data;
    if (!userData) {
      throw new NotFoundException(
        `The User with userId ${userId} is not found!`,
      );
    }

    return userData;
  }

  async getUserById(userId: number): Promise<any> {
    const userData = await this.getUserDataById(userId);

    return userData.data;
  }

  async getUserAvatarByUserId(userId: number): Promise<any | undefined> {
    const userData = await this.getUserDataById(userId);
    const avatarUrl = userData.data.avatar;

    const response = await this.httpService
      .get(avatarUrl, {
        responseType: 'arraybuffer',
      })
      .toPromise();

    const base64Image = Buffer.from(response.data, 'binary').toString('base64');

    const saveDirectory = './assets/avatars';
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory);
    }

    fs.writeFileSync(`${saveDirectory}/${userId}_avatar.txt`, base64Image);

    return { data: base64Image };
  }
}
