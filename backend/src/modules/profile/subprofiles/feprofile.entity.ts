import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { StringArrayTransformer } from './str-arr.transformer';

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
}
