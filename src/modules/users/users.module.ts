import { AvatarsModule } from '../avatars/avatars.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [AvatarsModule, HttpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
