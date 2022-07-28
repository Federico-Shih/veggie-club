import {IsString} from 'class-validator';

export default class UserCreateDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
