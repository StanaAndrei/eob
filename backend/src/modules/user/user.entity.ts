import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Profile } from '../profile/profile.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @ManyToOne(() => User, (user) => user.subordinates)
  manager: User;

  @Column({ nullable: true })
  managerId: number;

  @Column({ nullable: true })
  profileId: number;

  @Column({ nullable: true })
  changedPassword: boolean;

  @OneToMany(() => User, (user) => user.manager)
  subordinates: User[];

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  name: string;

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

  @Column({ select: false, nullable: true, insert: false, update: false })
  public rolePriority: number;

  @Column({ nullable: true })
  buddyId: number;

  @ManyToOne(() => User, (user) => user.newbies)
  buddy: User;

  @OneToMany(() => User, (user) => user.buddy)
  newbies: User;
}
