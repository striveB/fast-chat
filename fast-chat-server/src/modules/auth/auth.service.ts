import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { RCode } from '../../common/constant/rcode';
import { JwtService } from '@nestjs/jwt';
import { FriendService } from '../friend/friend.service'
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly JwtService: JwtService,
    private readonly friendService: FriendService
  ) {}

  async login(user: User) {
      let {userName, userPassword} = user;
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where(
          `user.userName = '${userName}' and user.userPassword = '${userPassword}'`,
        )
        .getOne();
      const token = this.createToken(user);
      delete user.userPassword;
      if (user) {
        return {
          code: RCode.OK,
          msg: '登录成功！',
          data: {
            user,
            token,
          },
        };
      } else {
        return { code: RCode.FAIL, msg: '账号或密码错误！' };
      }
    } catch (err) {
      return { code: RCode.ERROR, msg: '系统错误:' + err };
    }
  }
  //注册用户
  async register(user: User) {
    const users = await this.userRepository.find({
      where: [
        {
          userName: user.userName,
        },
      ],
    });
    if (users.length) {
      return { code: RCode.FAIL, msg: '用户名重复' };
    } else if (!user.userName || !user.userPassword) {
        return { code: RCode.FAIL, msg: '信息有误' };
    }
    user.avatar = 'https://img0.baidu.com/it/u=178892670,2966992691&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400'
    user.userId = new Date().getTime().toString();
    user.createDate = new Date();
    const token = this.createToken(user);
    const newUser = await this.userRepository.save(user);
    if (newUser) {
        const addRes = await this.friendService.addFriend({userId: newUser.userId, friendId: '123'})
        console.log(addRes);
        return { code: RCode.OK, msg: '注册成功！', data: {user: newUser, token} };
    } else {
      return { code: RCode.ERROR, msg: '注册失败' };
    }
  }
  createToken(user: User){
    const payload = { username: user.userName, userId: user.userId };
    const token = this.JwtService.sign(payload);
    return token
  }
}
