import { Injectable } from '@nestjs/common';
import { ProfileDTO } from './profile.dto';
import { User } from '../user/user.entity';
//import { classToPlain, plainToClass } from 'class-transformer';
//import { Profile } from './profile.entity';

@Injectable()
export class ProfileService {
  async createProfile(
    profileDTO: ProfileDTO,
    userID: number,
  ): Promise<boolean> {
    try {
      const user = await User.findOne({
        where: { id: userID },
      });
      if (!user.profile) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}
