import { Controller, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  findOne() {
    console.log('====================================');
    console.log();
    console.log('====================================');
  }
}
