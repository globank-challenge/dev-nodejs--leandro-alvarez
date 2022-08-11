import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsEnum
} from '@nestjs/class-validator';

enum repoStates {
  ENABLE = 'E',
  DISABLE = 'D',
  ARCHIVED = 'A'
}

enum registerStates {
  ACTIVE = 'A',
  INACTIVE = 'I',
}

import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateRepositoryDto {
  @IsNotEmpty()
  @IsNumber()
  readonly tribeId : number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  @IsEnum(repoStates)
  readonly state: repoStates;

  @IsNotEmpty()
  @IsEnum(registerStates)
  readonly status:registerStates;

  @IsOptional()
  readonly metricId:number;

}

export class UpdateRepositoryDto extends PartialType(CreateRepositoryDto) {}
