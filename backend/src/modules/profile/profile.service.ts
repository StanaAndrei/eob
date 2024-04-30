import { Injectable } from '@nestjs/common';
import { ProfileDTO } from './profile.dto';
import { User } from '../user/user.entity';
import { plainToInstance } from 'class-transformer';
import { Profile } from './profile.entity';
import { FEProfile } from './subprofiles/feprofile.entity';
import { SSProfile } from './subprofiles/ssprofile.entity';
import { BEProfile } from './subprofiles/beprofile.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class ProfileService {
  constructor(private readonly userService: UserService) {}

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
      if (!user.isOld) {
        return await this.matchBasedOnProfile(user);
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  private async matchBasedOnProfile(newbie: User): Promise<boolean> {
    let bestMatch = {
      simScores: [0, 0],
      id: -1,
    };
    type ScoreOfStrArrsTp = (arr1: string[], arr2: string[]) => number;
    const getScoreOfArr: ScoreOfStrArrsTp = (arr1, arr2) =>
      arr1.filter((elem: string) => arr2.includes(elem)).length;
    try {
      if (newbie.profile.feProfile) {
        const fePotUsers = await User.findByProfile('fe');
        const newbieFws = newbie.profile.feProfile.fws;
        const newbieTools = newbie.profile.feProfile.tools;
        //console.log(fePotUsers);
        for (const fePotUser of fePotUsers) {
          if (!fePotUser.isOld) {
            continue;
          }
          const buddyFws = fePotUser.profile.feProfile.fws;
          const buddyTools = fePotUser.profile.feProfile.tools;
          const simScores = [
            getScoreOfArr(newbieFws, buddyFws),
            getScoreOfArr(newbieTools, buddyTools),
          ];
          if (bestMatch.simScores < simScores) {
            bestMatch = { simScores, id: fePotUser.id };
          }
        }
        if (bestMatch.id !== -1) {
          return await this.userService.manualMatch(bestMatch.id, newbie.id);
        }
      }
      if (newbie.profile.beProfile) {
        const bePotUsers = await User.findByProfile('be');
        const newbieFws = newbie.profile.feProfile.fws;
        const newbieLangs = newbie.profile.feProfile.tools;
        for (const bePotUser of bePotUsers) {
          if (!bePotUser.isOld) {
            continue;
          }
          const buddyFws = bePotUser.profile.feProfile.fws;
          const buddyTools = bePotUser.profile.feProfile.tools;
          const simScores = [
            getScoreOfArr(newbieFws, buddyFws),
            getScoreOfArr(newbieLangs, buddyTools),
          ];
          if (bestMatch.simScores < simScores) {
            bestMatch = { simScores, id: bePotUser.id };
          }
        }
        console.log(bestMatch);
        if (bestMatch.id !== -1) {
          return await this.userService.manualMatch(bestMatch.id, newbie.id);
        }
      }
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
