import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';
import { PartialType }  from '@nestjs/swagger';

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
