import {Module} from '@nestjs/common';
import UserService from './user.service';
import {PrismaService} from '../prisma.service';

@Module({
  providers: [PrismaService, UserService],
  exports: [UserService],
})
export default class UserModule {
}
