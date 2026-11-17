import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  ForbiddenException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ProfileDTO } from './profile.dto';
import { ProfileService } from './profile.service';
import { UserService } from '../user/user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(
    private profileService: ProfileService,
    private userService: UserService,
  ) {}

  @Post(':userId')
  @HttpCode(HttpStatus.CREATED)
  async createProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() profileDTO: ProfileDTO,
    @Req() request: Request,
  ) {
    if (!(await this.userService.canManageProfile(request['user_id'], userId)))
      throw new ForbiddenException();
    const ok = await this.profileService.createProfile(profileDTO, userId);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }

  @Patch(':userId')
  async updateProfile(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() profileDTO: ProfileDTO,
    @Req() request: Request,
  ) {
    if (!(await this.userService.canManageProfile(request['user_id'], userId)))
      throw new ForbiddenException();
    const ok = await this.profileService.updateProfile(profileDTO, userId);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }
}
