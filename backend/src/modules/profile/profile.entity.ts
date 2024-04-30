import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SSProfile } from './subprofiles/ssprofile.entity';
import { FEProfile } from './subprofiles/feprofile.entity';
import { BEProfile } from './subprofiles/beprofile.entity';

export enum IndustryType {
  TECH,
  HEALTH,
  FINANCE,
  EDU,
  RETAIL,
  OTHER,
}

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  xp: number;

  @Column({
    type: 'enum',
    enum: IndustryType,
    nullable: false,
  })
  indType: IndustryType;

  @OneToOne(() => FEProfile)
  @JoinColumn()
  feProfile: FEProfile;

  @OneToOne(() => BEProfile)
  @JoinColumn()
  beProfile: BEProfile;

  @OneToOne(() => SSProfile)
  @JoinColumn()
  ssProfile: SSProfile;

  @Column()
  ssProfileId: number;

  @Column()
  feProfileId: number;

  @Column()
  beProfileId: number;
}
