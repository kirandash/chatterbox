import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    // default usernameField is 'username', but we want to use 'email'
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    try {
      return await this.usersService.verifyUser(email, password);
    } catch (error) {
      // rethrow the error as UnauthorizedException since verifyUser might also throw user not found error along with unauthorized error
      // we want to group all the unauthorized errors under UnauthorizedException
      throw new UnauthorizedException(error);
    }
  }
}
