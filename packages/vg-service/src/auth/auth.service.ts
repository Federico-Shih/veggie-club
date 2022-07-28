import {Injectable, NotFoundException} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import UserService from '../user/user.service';
import {AuthUser} from 'src/auth/auth.types';

@Injectable()
export default class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<AuthUser | null> {
    const user = await this.userService.findUserByUsername(username);
    if (!user) throw new NotFoundException();
    if (user && (await bcrypt.compare(password, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {password, ...result} = user;
      return result;
    }
    return null;
  }

  async login(user: AuthUser) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }
}
