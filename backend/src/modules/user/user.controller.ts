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
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/user-create.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findOne() {
    console.log('====================================');
    console.log();
    console.log('====================================');
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDTO) {
    const ok = await this.userService.create(createUserDto);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }

  @Post('other/:email')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(AuthGuard)
  async createOther(@Req() request: Request, @Param('email') email: string) {
    const ok = await this.userService.createOther(request['user_id'], email);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }
}
