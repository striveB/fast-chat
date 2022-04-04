import { Controller, Get, Query } from '@nestjs/common';
import { FriendService } from './friend.service';
import { ApiTags } from '@nestjs/swagger';
@Controller('friend')
@ApiTags('好友')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
}
