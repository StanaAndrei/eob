import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { ProfileDTO } from './profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProfile(@Req() req: Request, @Body() profileDTO: ProfileDTO) {
    const ok = await this.profileService.createProfile(
      profileDTO,
      req['user_id'],
    );
    if (!ok) {
      throw new InternalServerErrorException();
    }
  }
}
