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
      await User.getRepository().manager.transaction(
        async (transactionalEntityManager) => {
          const feProfile = plainToInstance(FEProfile, profileDTO.feProfile);
          const beProfile = plainToInstance(BEProfile, profileDTO.beProfile);
          const ssProfile = plainToInstance(SSProfile, profileDTO.ssProfile);

          await transactionalEntityManager.save(FEProfile, feProfile);
          await transactionalEntityManager.save(BEProfile, beProfile);
          await transactionalEntityManager.save(SSProfile, ssProfile);

          const profile = plainToInstance(Profile, profileDTO);
          profile.feProfile = feProfile;
          profile.beProfile = beProfile;
          profile.ssProfile = ssProfile;

          await transactionalEntityManager.save(Profile, profile);

          user.profile = profile;
          await transactionalEntityManager.save(User, user);
        },
      );
      await this.matchBasedOnProfile(user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async updateProfile(
    profileDTO: ProfileDTO,
    userId: number,
  ): Promise<boolean> {
    try {
      const user = await User.findOne({
        where: { id: userId },
      });
      let { profile } = user;
      console.log(user);
      await Profile.getRepository().manager.transaction(
        async (transactionalEntityManager) => {
          const feProfile = plainToInstance(FEProfile, profileDTO.feProfile);
          const beProfile = plainToInstance(BEProfile, profileDTO.beProfile);
          const ssProfile = plainToInstance(SSProfile, profileDTO.ssProfile);

          await transactionalEntityManager.save(FEProfile, feProfile);
          await transactionalEntityManager.save(BEProfile, beProfile);
          await transactionalEntityManager.save(SSProfile, ssProfile);

          profile = plainToInstance(Profile, profileDTO);
          profile.feProfile = feProfile;
          profile.beProfile = beProfile;
          profile.ssProfile = ssProfile;

          await transactionalEntityManager.save(Profile, profile);
        },
      );
      await this.matchBasedOnProfile(user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  private async matchBasedOnProfile(targetUser: User): Promise<boolean> {
    let bestMatch = {
      simScores: [0, 0],
      id: -1,
    };
    type ScoreOfStrArrsTp = (arr1: string[], arr2: string[]) => number;
    const getScoreOfArr: ScoreOfStrArrsTp = (arr1, arr2) =>
      arr1.filter((elem: string) => arr2.includes(elem)).length;
    try {
      if (targetUser?.profile?.feProfile) {
        const fePotUsers = await User.findByProfile('fe', targetUser.managerId);
        const newbieFws = targetUser.profile.feProfile.fws;
        const newbieTools = targetUser.profile.feProfile.tools;
        //console.log(fePotUsers);
        for (const fePotUser of fePotUsers) {
          if (fePotUser.isOld !== targetUser.isOld) {
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
          if (!targetUser.isOld) {
            return await this.userService.manualMatch(
              bestMatch.id,
              targetUser.id,
            );
          } else {
            return await this.userService.manualMatch(
              targetUser.id,
              bestMatch.id,
            );
          }
        }
      }
      if (targetUser?.profile?.beProfile) {
        const bePotUsers = await User.findByProfile('be', targetUser.managerId);
        const newbieFws = targetUser.profile.feProfile.fws;
        const newbieLangs = targetUser.profile.feProfile.tools;
        for (const bePotUser of bePotUsers) {
          if (bePotUser.isOld !== targetUser.isOld) {
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
        //console.log(bestMatch);
        if (bestMatch.id !== -1) {
          if (!targetUser.isOld) {
            return await this.userService.manualMatch(
              bestMatch.id,
              targetUser.id,
            );
          } else {
            return await this.userService.manualMatch(
              targetUser.id,
              bestMatch.id,
            );
          }
        }
      }
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      return false;
    }
  }
}
