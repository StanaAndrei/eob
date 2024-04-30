import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserDTO } from './dtos/user.dto';
import { MailService } from '../mail/mail.service';
import { DETAILS_SUBJECT } from '../mail/mail.consts';
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
      if (user.changedPassword) {
        return false;
      }
      user.changedPassword = true;
      user.password = newPassword;
      await user.save();
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
      if (!newbie || newbie.buddyId === buddyId) {
        return false;
      }
      newbie.buddyId = buddyId;
      await newbie.save();
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
