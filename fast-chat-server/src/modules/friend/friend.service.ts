import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserFriend } from './entity/user_friend.entity';
import { RCode } from '../../common/constant/rcode';
@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(UserFriend)
    private readonly friendRepository: Repository<UserFriend>,
  ) {}

  async addFriend({userId, friendId}) {
    if(!userId || !friendId) {
        return {code: RCode.FAIL, msg: '好友添加失败！'};
    }
    try {
        await this.friendRepository.save({userId, friendId})
        await this.friendRepository.save({userId: friendId, friendId: userId})
        return {code: RCode.OK, msg: '好友添加成功！'};
    } catch(err) {
        return {code: RCode.ERROR, msg: '好友添加失败：' + err.message};
    }
  }
}
