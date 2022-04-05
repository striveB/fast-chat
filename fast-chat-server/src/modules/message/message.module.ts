import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { UserMessage } from './entity/user_message.entity';
import { MessageController } from './message.controller';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserMessage])],
  controllers: [MessageController],
  providers: [MessageService],
  exports: [MessageService],
})
export class MessageModule {}
