import { Module } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { AvatarsRepository } from './avatars.repository';

@Module({
  providers: [AvatarsService, AvatarsRepository],
  exports: [AvatarsService],
})
export class AvatarsModule {}
