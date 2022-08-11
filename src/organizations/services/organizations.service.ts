import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Organization } from './../entities/organizations.entity'
import { CreateOrganizationDto, UpdateOrganizationDto } from './../dtos/organizations.dto';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization) private organizationRepo:Repository<Organization>,
  ){}


  create(data: CreateOrganizationDto) {
    const newOrganization = this.organizationRepo.create(data);
    return this.organizationRepo.save(newOrganization);

  }

  findAll() {
    //return this.organizations;
    return this.organizationRepo.find();
  }

  async findOne(id: number) {
    const organization = await this.organizationRepo.findOneBy({
      id: id
  });
    if (!organization) {
      throw new NotFoundException(`Organization #${id} not found`);
    }
    return organization;
  }


  async  update(id: number, changes: UpdateOrganizationDto) {
    const organization = await this.organizationRepo.findOneBy({
      id: id
  });
  if (!organization) {
    throw new NotFoundException(`Organization #${id} not found`);
  }
    this.organizationRepo.merge(organization, changes);
    return this.organizationRepo.save(organization);
  }

  remove(id: number) {
    return this.organizationRepo.delete(id);
  }
}
