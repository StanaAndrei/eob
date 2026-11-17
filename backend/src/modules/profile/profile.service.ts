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
      if (!user || user.profileId) {
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
      if (!user?.profile) return false;
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
      user.profile = profile;
      await this.matchBasedOnProfile(user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  private async matchBasedOnProfile(targetUser: User): Promise<boolean> {
    const overlapCount = (a: string[] = [], b: string[] = []) =>
      a.filter((item) => b.includes(item)).length;
    try {
      if (!targetUser?.profile) return false;
      const findBest = async (
        kind: 'fe' | 'be',
        targetSkills: string[][],
      ): Promise<number | undefined> => {
        const candidates = await User.findByProfile(kind, targetUser.managerId);
        let bestId: number | undefined;
        let bestScore = 0;
        for (const candidate of candidates) {
          if (
            candidate.id === targetUser.id ||
            candidate.isOld === targetUser.isOld
          )
            continue;
          if (!targetUser.isOld && candidate.buddyId != null) continue;
          const skills =
            kind === 'fe'
              ? [
                  candidate.profile.feProfile.fws,
                  candidate.profile.feProfile.tools,
                ]
              : [
                  candidate.profile.beProfile.fws,
                  candidate.profile.beProfile.plangs,
                ];
          const score = targetSkills.reduce(
            (sum, list, index) => sum + overlapCount(list, skills[index]),
            0,
          );
          if (score > bestScore) {
            bestScore = score;
            bestId = candidate.id;
          }
        }
        return bestId;
      };

      if (targetUser.profile.feProfile) {
        const matchId = await findBest('fe', [
          targetUser.profile.feProfile.fws,
          targetUser.profile.feProfile.tools,
        ]);
        if (matchId)
          return targetUser.isOld
            ? this.userService.manualMatch(targetUser.id, matchId)
            : this.userService.manualMatch(matchId, targetUser.id);
      }
      if (targetUser.profile.beProfile) {
        const matchId = await findBest('be', [
          targetUser.profile.beProfile.fws,
          targetUser.profile.beProfile.plangs,
        ]);
        if (matchId)
          return targetUser.isOld
            ? this.userService.manualMatch(targetUser.id, matchId)
            : this.userService.manualMatch(matchId, targetUser.id);
      }
    } catch (err) {
      console.error(err);
      return false;
    }
    return false;
  }
}
