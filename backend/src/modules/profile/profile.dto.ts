import { IsNotEmpty } from 'class-validator';
import { IndustryType } from './profile.entity';

export class ProfileDTO {
  @IsNotEmpty()
  xp: number;

  @IsNotEmpty()
  indType: IndustryType;

  @IsNotEmpty()
  isBE: boolean;

  @IsNotEmpty()
  isFE: boolean;
}
