import { Inject, Injectable } from '@nestjs/common';
import { Db, Collection, Document } from 'mongodb';
import { InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateAvatarDto } from './dtos/create-avatar.dto';
import { DB_CONNECTION } from '../mongo/mongo.contants';

@Injectable()
export class AvatarsRepository {
  private logger = new Logger('AvatarsRepository', true);
  private collection: Collection;
  constructor(
    @Inject(DB_CONNECTION)
    private db: Db,
  ) {
    this.collection = this.db.collection('avatars');
  }

  async createAvatar(avatar: CreateAvatarDto): Promise<Document> {
    try {
      return await this.collection.insertOne(avatar);
    } catch (err) {
      this.logger.error(`Failed to create avatar.`, err);
      throw new InternalServerErrorException();
    }
  }

  async getAvatarByUserId(userId: number): Promise<Document> {
    try {
      return await this.collection.findOne({ userId });
    } catch (err) {
      this.logger.error(`Failed to get avatar by userId.`, err);
      throw new InternalServerErrorException();
    }
  }
}
