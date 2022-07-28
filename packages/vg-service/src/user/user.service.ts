import {Injectable} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {PrismaService} from '../prisma.service';
import {User} from '@prisma/client';
import UserCreateDto from '../auth/validators/user.create.dto';

@Injectable()
export default class UserService {
  constructor(private readonly prisma: PrismaService) {
  }

  findUser(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({where: {id}});
  }

  findUserByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findFirst({where: {username}});
  }

  async createUser({username, password}: UserCreateDto) {
    const hashed = await bcrypt.hash(password, 10);
    const res = await this.prisma.user.create({
      data: {
        username,
        password: hashed,
      },
    });
    delete res.password;
    return res;
  }
}
