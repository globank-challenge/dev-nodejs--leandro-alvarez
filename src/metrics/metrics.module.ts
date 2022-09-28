import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetricsController } from './controllers/metrics.controller';
import { MetricsService } from './services/metrics.service';
import { Metrics } from './entities/metrics.entity';
import {RepositoriesModule} from './../repositories/repositories.module'

import { Tribes } from '../tribes/entities/tribes.entity';


@Module({
  imports: [RepositoriesModule,TypeOrmModule.forFeature([Metrics,Tribes])],
  controllers: [MetricsController],
  providers: [MetricsService],
  exports: [MetricsService]

})
export class MetricsModule {}
