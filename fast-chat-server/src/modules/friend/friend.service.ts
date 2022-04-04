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
}
