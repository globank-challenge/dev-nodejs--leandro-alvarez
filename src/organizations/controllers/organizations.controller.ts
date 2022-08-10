import { Controller,Get,Query,Param,Body,Post,Put,Delete,HttpCode,HttpStatus,ParseIntPipe  } from '@nestjs/common';

import { OrganizationsService } from './../services/organizations.service';
import { CreateOrganizationDto, UpdateOrganizationDto } from './../dtos/organizations.dto';

@Controller('organizations')
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Get()
  getProducts() {
    return this.organizationsService.findAll();
  }

  @Get(':organizationId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('organizationId',ParseIntPipe) organizationId: number) {
    return this.organizationsService.findOne(organizationId);
  }

  @Post()
  create(@Body() payload: CreateOrganizationDto) {
    return this.organizationsService.create(payload);
  }

  @Put(':organizationId')
  update(@Param('organizationId',ParseIntPipe) organizationId: number, @Body() payload: UpdateOrganizationDto) {
    return this.organizationsService.update(organizationId, payload);
  }

  @Delete(':organizationId')
  delete(@Param('organizationId',ParseIntPipe) organizationId: number) {
    return this.organizationsService.remove(organizationId);
  }

}
