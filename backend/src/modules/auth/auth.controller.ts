import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';
import { AllowAnon } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @AllowAnon()
  async signIn(@Body() loginDto: LoginDTO) {
    const { email, password } = loginDto;
    const res = await this.authService.signIn(email, password);
    if (res == null) {
      throw new InternalServerErrorException();
    }
    if (res.err) {
      throw new UnauthorizedException(res);
    }
    return res;
  }
}
