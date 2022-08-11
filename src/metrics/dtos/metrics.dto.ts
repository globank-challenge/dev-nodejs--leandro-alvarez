import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsDecimal,
  IsOptional
} from 'class-validator';

import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateMetricsDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id_repository: number;

  @IsNotEmpty()
  @IsDecimal()
  @IsPositive()
  @IsOptional()
  readonly coverage: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly bugs: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly vulnerabilities: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly hostpot: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @IsOptional()
  readonly code_smells: number;
}

export class UpdateMetricsDto extends PartialType(CreateMetricsDto) {}
