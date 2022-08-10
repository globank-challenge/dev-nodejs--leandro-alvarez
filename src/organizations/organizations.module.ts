import { Module } from '@nestjs/common';

import { OrganizationsController } from './controllers/organizations.controller';
import { OrganizationsService } from './services/organizations.service';


@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}
