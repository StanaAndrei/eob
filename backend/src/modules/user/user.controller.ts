import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserDTO } from './dtos/user.dto';
import { AllowAnon } from '../auth/auth.guard';
import { UserInterceptor } from './user.interceptor';
import { OtherUserDTO } from './dtos/other.dto';

@Controller('user')
@UseInterceptors(UserInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async getWithProfile(@Param('id') id: number) {
    const userWithProfile = await this.userService.getWithProfile(id);
    return userWithProfile;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @AllowAnon()
  async create(@Body() userDTO: UserDTO) {
    const ok = await this.userService.create(userDTO);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }

  @Post('other')
  @HttpCode(HttpStatus.CREATED)
  async createOther(
    @Req() request: Request,
    @Body() otherUserDTO: OtherUserDTO,
  ) {
    const ok = await this.userService.createOther(
      request['user_id'],
      otherUserDTO,
    );
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }

  @Get('my-employees')
  async getMyEmployees(@Req() request: Request) {
    const id = request['user_id'];
    return await this.userService.getMyEmployees(id);
  }

  @Patch('change-password/:newPassword')
  async changePassword(
    @Req() request: Request,
    @Param('newPassword') newPassword: string,
  ) {
    const id = request['user_id'];
    const ok = await this.userService.changePassword(id, newPassword);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }
}
