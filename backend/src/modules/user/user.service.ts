import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDTO } from './dtos/user-create.dto';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(where: any): Promise<User | undefined> {
    return this.userRepo.findOne({ where });
  }

  async create(createUserDto: CreateUserDTO): Promise<boolean> {
    try {
      const user = new User();
      user.email = createUserDto.email;
      user.password = createUserDto.password;
      user.isManager = createUserDto.isManager;
      await this.userRepo.save(user);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
}
