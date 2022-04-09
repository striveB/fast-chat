import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from '../user/entity/user.entity';

@Controller('auth')
@ApiTags('授权')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //   @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Body() user: User) {
    return this.authService.login(user.userName, user.userPassword);
  }
}
