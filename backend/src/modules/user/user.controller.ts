import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
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

@Controller('user')
@UseInterceptors(UserInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findOne() {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @AllowAnon()
  async create(@Body() userDTO: UserDTO) {
    const ok = await this.userService.create(userDTO);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }

  @Post('other/:email')
  @HttpCode(HttpStatus.CREATED)
  async createOther(@Req() request: Request, @Param('email') email: string) {
    const ok = await this.userService.createOther(request['user_id'], email);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }

  @Get('/my-employees')
  async getMyEmployees(@Req() request: Request) {
    const id = request['user_id'];
    return await this.userService.getMyEmployees(id);
  }
}
