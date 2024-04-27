import { Injectable } from '@nestjs/common';
import { ProfileDTO } from './profile.dto';
import { User } from '../user/user.entity';
import { plainToInstance } from 'class-transformer';
import { Profile } from './profile.entity';

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
      if (user.profile) {
        return false;
      }
      const profile = plainToInstance(Profile, profileDTO);
      await profile.save();
      user.profile = profile;
      await user.save();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
