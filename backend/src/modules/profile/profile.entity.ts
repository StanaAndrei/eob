import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ValueTransformer,
} from 'typeorm';
import { SSProfile } from './subprofiles/ssprofile.entity';
import { FEProfile } from './subprofiles/feprofile.entity';
import { BEProfile } from './subprofiles/beprofile.entity';

export enum IndustryTypePredef {
  TECH,
  HEALTH,
  FINANCE,
  EDU,
  RETAIL,
  OTHER,
}

export type IndustryType = IndustryTypePredef | string;

const myFieldTransformer: ValueTransformer = {
  to: (value: IndustryType[]) => {
    // Convert array to string for database storage
    return value?.join(',');
  },
  from: (value: string) => {
    // Convert string from database to array
    return value?.split(',') as IndustryType[];
  },
};

@Entity('profiles')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  xp: number;

  @Column({
    type: 'text',
    transformer: myFieldTransformer,
    nullable: false,
  })
  indType: IndustryType[];

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
