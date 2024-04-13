import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => User, (user) => user.subordinates)
  manager: User;

  @Column({ nullable: true })
  managerId: number;

  @OneToMany(() => User, (user) => user.manager)
  subordinates: User[];

  @CreateDateColumn()
  createdAt: Date;

  get isOld(): boolean {
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return this.createdAt < oneYearAgo;
  }

  get isManager(): boolean {
    return this.managerId == null;
  }

  isPasswordValid(password: string): boolean {
    return !!bcrypt.compareSync(password, this.password);
  }
}
