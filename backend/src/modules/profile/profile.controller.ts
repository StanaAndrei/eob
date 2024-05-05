import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProfileDTO } from './profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post(':userId')
  @HttpCode(HttpStatus.CREATED)
  async createProfile(
    @Param('userId') userId: number,
    @Body() profileDTO: ProfileDTO,
  ) {
    const ok = await this.profileService.createProfile(profileDTO, userId);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }

  @Patch(':userId')
  async updateProfile(
    @Param('userId') userId: number,
    @Body() profileDTO: ProfileDTO,
  ) {
    const ok = await this.profileService.updateProfile(profileDTO, userId);
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }
}
