import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; err: string | undefined }> {
    try {
      const user = await this.userService.findOne(email);
      if (!user) {
        return { accessToken: null, err: 'EMAIL_NOT_FOUND' };
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return { accessToken: null, err: 'WRONG_PASSWORD' };
      }
      const payload = {
        id: user.id,
      };
      const accessToken = await this.jwtService.signAsync(payload);
      console.log('====================================');
      console.log();
      console.log('====================================');
      return {
        accessToken,
        err: undefined,
      };
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}
