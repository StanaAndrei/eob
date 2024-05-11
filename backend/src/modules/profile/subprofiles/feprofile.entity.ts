import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StringArrayTransformer } from './str-arr.transformer';
import { Profile } from '../profile.entity';

@Entity('feprofiles')
export class FEProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    transformer: new StringArrayTransformer(),
    array: true,
  })
  fws: string[]; //frameworks

  @Column()
  jsLvl: number;

  @Column()
  tsLvl: number;

  @Column()
  htmlLvl: number;

  @Column()
  cssLvl: number;

  @Column({
    type: 'text',
    transformer: new StringArrayTransformer(),
    array: true,
  })
  tools: string[];

  @OneToOne(() => Profile, (profile) => profile.feProfile, {
    onDelete: 'SET NULL',
  })
  profile: Profile;
}
