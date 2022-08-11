import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MetricsController } from './controllers/metrics.controller';
import { MetricsService } from './services/metrics.service';
import { Metrics } from './entities/metrics.entity';
import {RepositoriesModule} from './../repositories/repositories.module'


@Module({
  imports: [RepositoriesModule,TypeOrmModule.forFeature([Metrics])],
  controllers: [MetricsController],
  providers: [MetricsService],

})
export class MetricsModule {}
