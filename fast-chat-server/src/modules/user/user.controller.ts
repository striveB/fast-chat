import { Controller, Post, Get, Query, Body, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';
import { ApiTags } from '@nestjs/swagger';
@Controller('user')
@ApiTags('用户')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  insert(@Body() user: User) {
    return this.userService.insert(user);
  }

  @Get('/login')
  login(
    @Query('userName') userName: string,
    @Query('userPassword') userPassword: string,
  ) {
    return this.userService.login(userName, userPassword);
  }

  @Get()
  findOne(@Query('userId') userId: string) {
    console.log(userId);
    return this.userService.findOne(userId);
  }

  @Get('friends')
  findUserFriends(@Query('userId') userId: string) {
    return this.userService.findUserFriends(userId);
  }
}
