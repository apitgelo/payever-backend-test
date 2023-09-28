import { Injectable, NotFoundException } from '@nestjs/common';
import { AvatarsRepository } from './avatars.repository';
import { CreateAvatarDto } from './dtos/create-avatar.dto';

@Injectable()
export class AvatarsService {
  constructor(private avatarsRepository: AvatarsRepository) {}

  async createAvatar(avatar: CreateAvatarDto) {
    return this.avatarsRepository.createAvatar(avatar);
  }

  async getAvatarByUserId(userId: string) {
    const avatar = await this.avatarsRepository.getAvatarByUserId(userId);

    if (!avatar) {
      throw new NotFoundException(
        `The Avatar with userId ${userId} is not found!`,
      );
    }

    return avatar;
  }
}
