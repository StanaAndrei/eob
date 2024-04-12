import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dtos/user-create.dto';

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
}
