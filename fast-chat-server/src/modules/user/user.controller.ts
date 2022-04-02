import { Controller, Post, Get, Query, Body, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  insert(@Body() user: User) {
    console.log(user);
    return this.userService.insert(user);
  }

  @Get()
  findOne(@Query('userId') userId: string) {
    console.log(userId);
    return this.userService.findOne(userId);
  }
}
