import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './dtos/user.dto';
import { MailService } from '../mail/mail.service';
import { DETAILS_SUBJECT } from '../mail/mail.consts';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private mailService: MailService,
  ) {}

  async findOne(where: any): Promise<User | undefined> {
    return this.userRepo.findOne({ where });
  }

  async create(UserDTO: UserDTO): Promise<boolean> {
    try {
      const user = new User();
      user.email = UserDTO.email;
      user.password = UserDTO.password;
      await this.userRepo.save(user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async createOther(managerId: number, email: string): Promise<boolean> {
    try {
      const user = new User();
      user.email = email;
      user.managerId = managerId;
      user.changedPassword = false;
      const genPass = Math.random().toString(36).slice(-8);
      user.password = genPass;
      await this.userRepo.save(user);
      await this.mailService.sendEmail(email, DETAILS_SUBJECT, './details', {
        tmpPass: genPass,
      });
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getMyEmployees(id: number): Promise<User[]> {
    try {
      const employees = await this.userRepo.find({
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
      const user = await this.userRepo.findOne({
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
}
