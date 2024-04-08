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
  async create(@Body() createUSerDto: CreateUserDTO) {
    const { email, password } = createUSerDto;
    const ok = await this.userService.create(email, password);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }
}
