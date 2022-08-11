import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TribesController } from './controllers/tribes.controller';
import { TribesService } from './services/tribes.service';
import { Tribes } from './entities/tribes.entity';
import { OrganizationsModule } from './../organizations/organizations.module'


@Module({
  imports: [OrganizationsModule,TypeOrmModule.forFeature([Tribes])],
  controllers: [TribesController],
  providers: [TribesService],
  exports: [TribesService]
})
export class TribesModule {}
