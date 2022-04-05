import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMessage } from './entity/user_message.entity';
import { RCode } from '../../common/constant/rcode';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(UserMessage)
    private readonly userMessageRepository: Repository<UserMessage>,
  ) {}
  //保存消息
  async saveMessage(message: UserMessage) {
    try {
      this.userMessageRepository.save(message);
      return { code: RCode.OK, msg: '添加消息成功！', data: message };
    } catch (err) {
      return { code: RCode.FAIL, msg: '消息获取失败！' };
    }
  }
  //获取与好友的消息
  async findMessages(userId: string, friendId: string) {
    try {
      if (userId !== friendId) {
        const messages = await this.userMessageRepository
          .createQueryBuilder('message')
          .where(`message.userId = '${userId}' and friendId = '${friendId}'`)
          .orWhere(`message.userId = '${friendId}' and friendId = '${userId}'`)
          .getMany();
        return { code: RCode.OK, msg: '消息获取成功！', data: messages };
      } else {
        return { code: RCode.FAIL, msg: '消息获取失败！' };
      }
    } catch (error) {
      return { code: RCode.ERROR, msg: '消息获取失败！' };
    }
  }
}
