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
import moment from 'moment';

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
    const diffInYears = moment().diff(moment(this.createdAt), 'years');
    //console.log(this.name, '~~~', diffInYears >= 1);
    return diffInYears >= 1;
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

  static async findByProfile(
    profileTp: string,
    managerId: number,
  ): Promise<User[]> {
    return await this.createQueryBuilder('user')
      .where('user.paused IS FALSE')
      .andWhere(`user.managerId=${managerId}`)
      //.andWhere('user.isOld IS TRUE')
      .innerJoinAndSelect('user.profile', 'profile')
      .innerJoinAndSelect(`profile.${profileTp}Profile`, `${profileTp}Profile`)
      .where(`profile.${profileTp}_profile_id IS NOT NULL`)
      .getMany();
  }

  @Column()
  paused: boolean;

  async togglePaused() {
    this.paused = !this.paused;
    await this.save();
  }

  @Column()
  matchDate: Date;
}
