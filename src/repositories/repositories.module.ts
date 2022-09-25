import { Module  } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoriesController } from './controllers/repositories.controller';
import { RepositoriesMetricController } from './controllers/repositoriesMetrics.controller';

import { RepositoriesService } from './services/repositories.service';
import { Repositories } from './entities/repositories.entity';
import { TribesModule } from './../tribes/tribes.module'
import { MetricsModule } from './../metrics/metrics.module'
import { HttpModule, HttpService } from '@nestjs/axios';

//import {} from 'https'


@Module({
  imports: [HttpModule,TribesModule,TypeOrmModule.forFeature([Repositories])],
  controllers: [RepositoriesController,RepositoriesMetricController],
  providers: [RepositoriesService,HttpModule,
    {
      provide: 'MockRepositories',
      useFactory: async (http: HttpService) => {
        const mockRepos = await http
          .get(process.env.MOCK_API)
          .toPromise();
        return mockRepos.data;
      },
      inject: [HttpService],
    },
    {
      provide: 'MockRepositories2',
      useFactory: async (http: HttpService) => {
        const mockRepos = await http
          .get(process.env.MOCK_API)
          .toPromise();
        return mockRepos.data;
      },
      inject: [HttpService],
    },
  ],
  exports: [RepositoriesService]
})
export class RepositoriesModule {}
