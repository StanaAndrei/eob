import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IndustryType } from './profile.entity';
import { Type } from 'class-transformer';

export class SSProfileDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  commStyle: string;

  @IsNotEmpty()
  conflictHandlingMethod: string;

  @IsNotEmpty()
  listeningLvl: number;

  @IsNotEmpty()
  verbalLvl: number;

  @IsNotEmpty()
  writtenLvl: number;

  @IsNotEmpty()
  collabLvl: number;

  @IsNotEmpty()
  conflictResolutionLvl: number;

  @IsNotEmpty()
  leadershipLvl: number;
}

export class FEProfileDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  fws: string[];

  @IsInt()
  @IsOptional()
  jsLvl?: number;

  @IsInt()
  @IsOptional()
  tsLvl?: number;

  @IsInt()
  @IsOptional()
  htmlLvl?: number;

  @IsInt()
  @IsOptional()
  cssLvl?: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  tools: string[];
}

export class BEProfileDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  fws: string[];

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  plangs: string[];

  @IsInt()
  @IsNotEmpty()
  dockerLvl: number;

  @IsInt()
  @IsNotEmpty()
  kuberLvl: number;

  @IsInt()
  @IsNotEmpty()
  awsAzureGcpLvl: number;

  @IsInt()
  @IsNotEmpty()
  sqlLvl: number;
}

export class ProfileDTO {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsInt()
  @IsNotEmpty()
  xp: number;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  indType: IndustryType[];

  @ValidateNested()
  @Type(() => SSProfileDTO)
  @IsNotEmpty()
  ssProfile: SSProfileDTO;

  @ValidateNested()
  @Type(() => FEProfileDTO)
  @IsOptional()
  feProfile: FEProfileDTO;

  @ValidateNested()
  @Type(() => BEProfileDTO)
  @IsOptional()
  beProfile: BEProfileDTO;

  @IsOptional()
  @IsInt()
  beProfileId?: number;
  @IsOptional()
  @IsInt()
  feProfileId?: number;
  @IsOptional()
  @IsInt()
  ssProfileId?: number;
}
