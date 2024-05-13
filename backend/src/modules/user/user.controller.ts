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
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { UserDTO } from './dtos/user.dto';
import { AllowAnon } from '../auth/auth.guard';
import { UserInterceptor } from './user.interceptor';
import { OtherUserDTO } from './dtos/other.dto';
import { ROLE_PRIORITY, RolesPriority } from '../auth/role.guard';

@Controller('user')
@UseInterceptors(UserInterceptor)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('my-employees')
  @RolesPriority(ROLE_PRIORITY.MANAGER)
  async getMyEmployees(@Req() request: Request) {
    const id = request['user_id'];    
    return await this.userService.getMyEmployees(id);
  }

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

  @RolesPriority(ROLE_PRIORITY.BUDDY)
  @Get('/newbies-of/:id')
  async getNewbiesOf(@Req() request: Request, @Param('id') id: number) {
    const newbies = await this.userService.getNewbiesOf(id);
    if (!newbies) {
      throw new InternalServerErrorException();
    }
    return newbies;
  }

  @RolesPriority(ROLE_PRIORITY.MANAGER)
  @Patch('/manual-match/:buddyId/:newbieId')
  async manualMatch(
    @Param('buddyId') buddyId: number,
    @Param('newbieId') newbieId: number,
    @Res() res: Response,
  ) {
    const ok = await this.userService.manualMatch(buddyId, newbieId);
    res.status(ok ? HttpStatus.NO_CONTENT : HttpStatus.NOT_MODIFIED).send();
  }

  @RolesPriority(ROLE_PRIORITY.BUDDY)
  @Patch('toggle-paused')
  async togglePaused(@Req() request: Request) {
    const ok = await this.userService.togglePaused(request['user_id']);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }
}
