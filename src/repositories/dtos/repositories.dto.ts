import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

enum repoStates {
  ENABLE = 'E',
  DISABLE = 'D',
  ARCHIVED = 'A'
}

enum registerStates {
  ACTIVE = 'A',
  INACTIVE = 'I',
}

import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateRepositoryDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly state: repoStates;

  @IsNotEmpty()
  readonly status:registerStates;
}

export class UpdateRepositoryDto extends PartialType(CreateRepositoryDto) {}
