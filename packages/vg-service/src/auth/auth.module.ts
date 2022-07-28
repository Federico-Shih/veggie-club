import {Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';

import UserModule from '../user/user.module';
import AuthService from './auth.service';
import {LocalStrategy} from './local.strategy';
import {AuthController} from './auth.controller';
import {JwtStrategy} from 'src/auth/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {expiresIn: '1w'},
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [ConfigService, AuthService, LocalStrategy, JwtStrategy],
  exports: [],
})
export default class AuthModule {
}
