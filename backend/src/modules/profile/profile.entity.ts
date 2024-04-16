import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum IndustryType {
  TECH,
  HEALTH,
  FINANCE,
  EDU,
  RETAIL,
  OTHER,
}

@Entity()
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

  @Column()
  isBE: boolean;

  @Column()
  isFE: boolean;
}
