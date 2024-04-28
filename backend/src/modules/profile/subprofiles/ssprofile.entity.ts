import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CommStyle {
  ASSERTIVE,
  PASSIVE,
  AGRESSIVE,
  COLLABORATIVE,
}

export enum ConflictHandlingMethod {
  AVOIDANCE,
  CONFRONTATION,
  COMPROMISE,
  COLLAB,
}

class EnumOrStringTransformerForCommStyle {
  to(databaseValue: CommStyle | string): string {
    if (typeof databaseValue === 'string') {
      return databaseValue;
    } else {
      return databaseValue.toString();
    }
  }

  from(value: string): CommStyle | string {
    if (Object.values(CommStyle).includes(value as unknown as CommStyle)) {
      return value as unknown as CommStyle;
    } else {
      return value;
    }
  }
}

class EnumOrStringTransformerForConflictHandlingMethod {
  to(databaseValue: ConflictHandlingMethod | string): string {
    if (typeof databaseValue === 'string') {
      return databaseValue;
    } else {
      return databaseValue.toString();
    }
  }

  from(value: string): ConflictHandlingMethod | string {
    if (
      Object.values(ConflictHandlingMethod).includes(
        value as unknown as ConflictHandlingMethod,
      )
    ) {
      return value as unknown as ConflictHandlingMethod;
    } else {
      return value;
    }
  }
}

@Entity('ssprofiles')
export class SSProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
    transformer: new EnumOrStringTransformerForCommStyle(),
  })
  commStyle: CommStyle | string;

  @Column({
    type: 'text',
    transformer: new EnumOrStringTransformerForConflictHandlingMethod(),
  })
  conflictHandlingMethod: ConflictHandlingMethod | string;

  @Column()
  listeningLvl: number;

  @Column()
  verbalLvl: number;

  @Column()
  writtenLvl: number;

  @Column()
  collabLvl: number;

  @Column()
  conflictResolutionLvl: number;

  @Column()
  leadershipLvl: number;
}
