import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { UserFriend } from './entity/user_friend.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserFriend])],
  providers: [FriendService],
  controllers: [FriendController],
})
export class FriendModule {}
