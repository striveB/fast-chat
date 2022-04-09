import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { RCode } from '../../common/constant/rcode';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly JwtService: JwtService,
  ) {}

  async login(userName: string, userPassword: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where(
          `user.userName = '${userName}' and user.userPassword = '${userPassword}'`,
        )
        .getOne();
      const payload = { username: user.userName, sub: user.userId };
      delete user.userPassword;
      const token = this.JwtService.sign(payload);
      console.log(token);
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
}
