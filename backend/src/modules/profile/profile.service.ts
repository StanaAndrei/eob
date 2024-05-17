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

          if (feProfile) {
            await transactionalEntityManager.save(FEProfile, feProfile);
          }
          if (beProfile) {
            await transactionalEntityManager.save(BEProfile, beProfile);
          }
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
        relations: [
          'profile',
          'profile.beProfile',
          'profile.feProfile',
          'profile.ssProfile',
        ],
      });
      let { profile } = user;
      console.log(user);
      await Profile.getRepository().manager.transaction(
        async (transactionalEntityManager) => {
          const feProfile = plainToInstance(FEProfile, profileDTO.feProfile);
          const beProfile = plainToInstance(BEProfile, profileDTO.beProfile);
          const ssProfile = plainToInstance(SSProfile, profileDTO.ssProfile);

          if (feProfile) {
            await transactionalEntityManager.save(FEProfile, feProfile);
          } else if (profileDTO.feProfileId) {
            //profile.feProfileId = null;
            await transactionalEntityManager.delete(
              FEProfile,
              profile.feProfileId,
            ); //*/
          }
          if (beProfile) {
            await transactionalEntityManager.save(BEProfile, beProfile);
          } else if (profileDTO.beProfileId) {
            await transactionalEntityManager.delete(
              BEProfile,
              profile.beProfileId,
            );
          }
          await transactionalEntityManager.save(SSProfile, ssProfile);
          profile = plainToInstance(Profile, profileDTO);
          profile.feProfile = feProfile ?? null;
          profile.beProfile = beProfile ?? null;
          profile.ssProfile = ssProfile;

          await transactionalEntityManager.query('SET FOREIGN_KEY_CHECKS=0');
          await transactionalEntityManager.save(Profile, profile);
          await transactionalEntityManager.query('SET FOREIGN_KEY_CHECKS=1');
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
        const targetFws = targetUser.profile.feProfile.fws;
        const targetTools = targetUser.profile.feProfile.tools;
        for (const fePotUser of fePotUsers) {
          if (
            fePotUser.isOld === targetUser.isOld ||
            fePotUser.id === targetUser.id
          ) {
            continue;
          }
          const pairFws = fePotUser.profile.feProfile.fws;
          const pairTools = fePotUser.profile.feProfile.tools;
          const simScores = [
            getScoreOfArr(targetFws, pairFws),
            getScoreOfArr(targetTools, pairTools),
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
        const targetFws = targetUser.profile.beProfile.fws;
        const targetLangs = targetUser.profile.beProfile.plangs;
        for (const bePotUser of bePotUsers) {
          if (
            bePotUser.isOld === targetUser.isOld ||
            bePotUser.id === targetUser.id
          ) {
            continue;
          }
          const pairFws = bePotUser.profile.beProfile.fws;
          const pairPlangs = bePotUser.profile.beProfile.plangs;
          const simScores = [
            getScoreOfArr(targetFws, pairFws),
            getScoreOfArr(targetLangs, pairPlangs),
          ];
          if (bestMatch.simScores < simScores) {
            bestMatch = { simScores, id: bePotUser.id };
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
    } catch (err) {
      console.error(err);
      return false;
    } finally {
      return false;
    }
  }
}
