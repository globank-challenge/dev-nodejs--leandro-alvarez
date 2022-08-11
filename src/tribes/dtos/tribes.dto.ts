import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType, OmitType } from '@nestjs/swagger';

export class CreateTribeDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly status: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly idOrganization : number
}

export class UpdateTribeDto extends PartialType(CreateTribeDto) {}
