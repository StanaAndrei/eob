import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dtos/user-create.dto';
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

  async create(createUserDto: CreateUserDTO): Promise<boolean> {
    try {
      const user = new User();
      user.email = createUserDto.email;
      user.password = createUserDto.password;
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
}
