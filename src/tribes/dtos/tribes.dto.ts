import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateTribeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly status: number;
}

export class UpdateTribeDto extends PartialType(CreateTribeDto) {}
