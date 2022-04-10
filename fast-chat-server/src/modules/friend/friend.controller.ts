import { Controller, Post, Get, Query, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FriendService } from './friend.service';
import { ApiTags } from '@nestjs/swagger';
import { UserFriend } from './entity/user_friend.entity';
@Controller('friend')
@ApiTags('好友')
@UseGuards(AuthGuard('jwt'))
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
  
  @Post()
  addFriend(@Body() friend: UserFriend){
      return this.friendService.addFriend(friend);
  }
}
