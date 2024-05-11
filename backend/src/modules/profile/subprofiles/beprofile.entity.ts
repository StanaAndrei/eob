import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StringArrayTransformer } from './str-arr.transformer';
import { Profile } from '../profile.entity';

@Entity('beprofiles')
export class BEProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    transformer: new StringArrayTransformer(),
    array: true,
  })
  fws: string[];

  @Column({
    type: 'text',
    transformer: new StringArrayTransformer(),
    array: true,
  })
  plangs: string[];

  @Column()
  dockerLvl: number;

  @Column()
  kuberLvl: number;

  @Column()
  awsAzureGcpLvl: number;

  @Column()
  sqlLvl: number;

  @OneToOne(() => Profile, (profile) => profile.beProfile, {
    onDelete: 'SET NULL',
  })
  profile: Profile;
}
