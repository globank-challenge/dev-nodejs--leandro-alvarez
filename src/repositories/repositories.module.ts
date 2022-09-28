import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoriesController } from './controllers/repositories.controller';
import { RepositoriesMetricController } from './controllers/repositoriesMetrics.controller';

import { RepositoriesService } from './services/repositories.service';
import { Repositories } from './entities/repositories.entity';
import { TribesModule } from './../tribes/tribes.module'
import { Tribes } from './../tribes/entities/tribes.entity'
import { MetricsModule } from './../metrics/metrics.module'
import { HttpModule, HttpService } from '@nestjs/axios';

//import {} from 'https'


@Module({
  imports: [HttpModule, TribesModule, TypeOrmModule.forFeature([Repositories, Tribes])],
  controllers: [RepositoriesController, RepositoriesMetricController],
  providers: [RepositoriesService, HttpModule],
  exports: [RepositoriesService]
})
export class RepositoriesModule { }
