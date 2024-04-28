import { Injectable } from '@nestjs/common';
import { ProfileDTO } from './profile.dto';
import { User } from '../user/user.entity';
import { plainToInstance } from 'class-transformer';
import { Profile } from './profile.entity';
import { FEProfile } from './subprofiles/feprofile.entity';
import { SSProfile } from './subprofiles/ssprofile.entity';
import { BEProfile } from './subprofiles/beprofile.entity';

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
      const feProfile = plainToInstance(FEProfile, profileDTO.feProfile);
      const beProfile = plainToInstance(BEProfile, profileDTO.beProfile);
      const ssProfile = plainToInstance(SSProfile, profileDTO.ssProfile);
      await feProfile?.save();
      await beProfile?.save();
      await ssProfile?.save();
      const profile = plainToInstance(Profile, profileDTO);
      profile.feProfile = feProfile;
      profile.beProfile = beProfile;
      profile.ssProfile = ssProfile;
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
