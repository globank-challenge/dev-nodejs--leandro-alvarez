import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrganizationsController } from './controllers/organizations.controller';
import { OrganizationsService } from './services/organizations.service';
import { Organization } from './entities/organizations.entity';

import { Tribes } from '../tribes/entities/tribes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Organization,Tribes])],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
  exports: [OrganizationsService]
})
export class OrganizationsModule {}
