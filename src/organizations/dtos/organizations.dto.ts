import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/mapped-types';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly status: number;
}

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {}
