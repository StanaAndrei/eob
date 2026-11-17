import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDTO } from './dtos/user.dto';
import { MailService } from '../mail/mail.service';
import { DETAILS_SUBJECT, MATCHED_SUBJECT } from '../mail/mail.consts';
import { OtherUserDTO } from './dtos/other.dto';

@Injectable()
export class UserService {
  constructor(private mailService: MailService) {}

  async findOne(where: any): Promise<User | undefined> {
    return User.findOne({ where });
  }

  async getWithProfile(id: number) {
    try {
      return await User.findOne({
        where: { id },
        relations: [
          'profile',
          'profile.ssProfile',
          'profile.beProfile',
          'profile.feProfile',
        ],
      });
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async canAccessProfile(actorId: number, targetId: number): Promise<boolean> {
    if (actorId === targetId) return true;
    const target = await User.findOne({ where: { id: targetId } });
    if (!target) return false;
    return target.managerId === actorId || target.buddyId === actorId;
  }

  async canManageProfile(actorId: number, targetId: number): Promise<boolean> {
    if (actorId === targetId) return true;
    const target = await User.findOne({ where: { id: targetId } });
    if (!target || target.managerId !== actorId) return false;
    const manager = await User.findOne({ where: { id: actorId } });
    return manager?.isManager === true;
  }

  async create(userDTO: UserDTO): Promise<boolean> {
    try {
      const user = new User();
      user.email = userDTO.email;
      user.password = userDTO.password;
      user.name = userDTO.name;
      await user.save();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async createOther(
    managerId: number,
    otherUserDTO: OtherUserDTO,
  ): Promise<boolean> {
    try {
      const user = new User();
      user.email = otherUserDTO.email;
      user.managerId = managerId;
      user.changedPassword = false;
      user.name = otherUserDTO.name;
      const genPass = Math.random().toString(36).slice(-8);
      user.password = genPass;
      await user.save();
      await this.mailService.sendEmail(
        otherUserDTO.email,
        DETAILS_SUBJECT,
        './details',
        {
          tmpPass: genPass,
        },
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getMyEmployees(id: number): Promise<User[]> {
    try {
      const employees = await User.find({
        where: { managerId: id },
      });
      return employees;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async changePassword(id: number, newPassword: string): Promise<boolean> {
    try {
      const user = await User.findOne({
        where: { id },
      });
      user.changedPassword = true;
      user.password = newPassword;
      await user.save();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getNewbiesOf(id: number): Promise<User[]> {
    try {
      const newbies = await User.find({
        where: { buddyId: id },
      });
      return newbies;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async manualMatch(buddyId: number, newbieId: number) {
    try {
      const newbie = await User.findOne({
        where: { id: newbieId },
      });
      const buddy = await User.findOne({ where: { id: buddyId } });
      if (
        !newbie ||
        !buddy ||
        newbie.id === buddy.id ||
        newbie.buddyId === buddyId ||
        newbie.isOld ||
        !buddy.isOld ||
        newbie.managerId !== buddy.managerId
      ) {
        return false;
      }
      newbie.buddyId = buddyId;
      await newbie.save();
      await this.mailService.sendEmail(
        newbie.email,
        MATCHED_SUBJECT,
        './matched',
        {
          pairName: buddy.name,
        },
      );
      await this.mailService.sendEmail(
        buddy.email,
        MATCHED_SUBJECT,
        './matched',
        {
          pairName: newbie.name,
        },
      );
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async togglePaused(id: number): Promise<boolean> {
    try {
      const user = await User.findOne({
        where: { id },
      });
      await user.togglePaused();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
