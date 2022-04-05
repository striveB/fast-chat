import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { RCode } from '../../common/constant/rcode';
import { UserFriend } from '../friend/entity/user_friend.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  //添加用户
  async insert(user: User) {
    const users = await this.userRepository.find({
      where: [
        {
          userName: user.userName,
        },
      ],
    });
    if (users.length) {
      return { code: RCode.FAIL, msg: '用户名重复' };
    }
    user.userId = new Date().toString();
    const newUser = await this.userRepository.save(user);
    if (newUser) {
      return { code: RCode.OK, msg: '注册成功！', data: newUser };
    } else {
      return { code: RCode.ERROR, msg: '注册失败' };
    }
  }
  async login(userName: string, userPassword: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { userName: userName, userPassword: userPassword },
      });
      delete user.userPassword;
      if (user) {
        return { code: RCode.OK, msg: '登录成功！', data: user };
      } else {
        return { code: RCode.FAIL, msg: '账号或密码错误！' };
      }
    } catch (err) {
      return { code: RCode.ERROR, msg: '系统错误！' };
    }
  }
  //根据id获取用户
  async findOne(userId: string) {
    try {
      let user;
      if (userId) {
        user = await this.userRepository
          .createQueryBuilder('user')
          .where(`user.userId = ${userId}`)
          .printSql()
          .getOne();

        if (user) {
          return { code: RCode.OK, msg: '获取用户成功！', data: user };
        } else {
          return { code: RCode.FAIL, msg: '未查询到此用户！', data: {} };
        }
      }
    } catch (error) {
      return { code: RCode.ERROR, msg: '获取用户失败！', data: error };
    }
  }
  async findUserFriends(userId: string) {
    try {
      if (userId) {
        const friends = await this.userRepository
          .createQueryBuilder('user')
          .leftJoinAndSelect(
            UserFriend,
            'user_friend',
            'user.userId = user_friend.friendId',
          )
          .where(`'${userId}' = user_friend.userId`)
          .select(
            `
          user.id as id,
          user.userId as userId,
          user.userName as userName,
          user.avatar as avatar
        `,
          )
          .getRawMany();

        return { code: RCode.OK, msg: '好友获取成功！', data: friends };
      } else {
        return { code: RCode.FAIL, msg: '好友获取失败！' };
      }
    } catch (err) {
      console.log(err);
      return { code: RCode.ERROR, msg: '好友获取失败！', data: {} };
    }
  }
}
