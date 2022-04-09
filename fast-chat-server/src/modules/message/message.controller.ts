import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';

@Controller('message')
@ApiTags('消息')
@UseGuards(AuthGuard('jwt'))
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  findMessages(
    @Query('userId') userId: string,
    @Query('friendId') friendId: string,
  ) {
    return this.messageService.findMessages(userId, friendId);
  }
}
