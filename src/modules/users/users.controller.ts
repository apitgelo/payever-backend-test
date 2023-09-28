import { Controller, Get, Logger, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  private logger = new Logger('UsersController');

  constructor(private usersService: UsersService) {}

  @Get('/:userId')
  async getUserById(@Param('userId') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Get('/:userId/avatar')
  async getUserAvatarByUserId(@Param('userId') userId: string) {
    return this.usersService.getUserAvatarByUserId(userId);
  }
}
