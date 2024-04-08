import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  async create(email: string, password: string): Promise<boolean> {
    try {
      const user = new User();
      user.email = email;
      user.password = password;
      await this.userRepo.save(user);
      return true;
    } catch (err) {
      return false;
    }
  }
}
