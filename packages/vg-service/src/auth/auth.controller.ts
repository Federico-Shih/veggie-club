import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  ForbiddenException,
} from '@nestjs/common';
import {LocalAuthGuard} from './guards/local.auth-guard';
import AuthService from './auth.service';
import CreateUserDto from './validators/user.create.dto';
import {JwtAuthGuard} from './guards/jwt.auth-guard';
import UserService from '../user/user.service';
import {ConfigService} from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  async register(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Post('/admin/register')
  async registerAdmin(@Body() body: CreateUserDto) {
    if (this.configService.get<string>('SETUP') === 'true') {
      return this.userService.createUser(body);
    } else {
      throw new ForbiddenException();
    }
  }
}
