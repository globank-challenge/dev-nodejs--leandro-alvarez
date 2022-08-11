import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
  IsDecimal,
  IsOptional,
  Max
} from 'class-validator';

import { PartialType, OmitType } from '@nestjs/swagger';

export class CreateMetricsDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly id_repository: number;

  @IsNotEmpty()
  //@IsDecimal()
  //@IsDecimal()
  @IsPositive()
  @IsOptional()
  @Max(100)
  readonly coverage: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly bugs: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly vulnerabilities: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly hostpot: number;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  readonly code_smells: number;
}

export class UpdateMetricsDto extends PartialType(CreateMetricsDto) {}
