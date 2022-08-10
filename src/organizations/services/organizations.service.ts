import { Injectable, NotFoundException } from '@nestjs/common';

import {Organization} from './../entities/organizations.entity'
import { CreateOrganizationDto, UpdateOrganizationDto } from './../dtos/organizations.dto';

@Injectable()
export class OrganizationsService {
  private counterId = 1;
  private organizations: Organization[] = [
    {
      id: 1,
      name: 'Organizacion1',
      status: 604
    },
  ];

  create(data: CreateOrganizationDto) {
    this.counterId = this.counterId + 1;
    const newOrganization = {
      id: this.counterId,
      ...data,
    };
    this.organizations.push(newOrganization);
    return newOrganization;
  }

  findAll() {
    return this.organizations;
  }

  findOne(id: number) {
    const organization = this.organizations.find((item) => item.id === id);
    if (!organization) {
      throw new NotFoundException(`Organization #${id} not found`);
    }
    return organization;
  }


  update(id: number, changes: UpdateOrganizationDto) {
    const organization = this.findOne(id);
    const index = this.organizations.findIndex((item) => item.id === id);
    this.organizations[index] = {
      ...organization,
      ...changes,
    };
    return this.organizations[index];
  }

  remove(id: number) {
    const index = this.organizations.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`organization #${id} not found`);
    }
    this.organizations.splice(index, 1);
    return true;
  }
}
