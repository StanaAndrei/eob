import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StringArrayTransformer } from './str-arr.transformer';

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
}
