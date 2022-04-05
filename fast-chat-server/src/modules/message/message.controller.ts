import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';

@Controller('message')
@ApiTags('消息')
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
