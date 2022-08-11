import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';

import {OrganizationsModule} from './organizations/organizations.module'
import {TribesModule} from './tribes/tribes.module'
import {RepositoriesModule} from './repositories/repositories.module'
import {MetricsModule} from './metrics/metrics.module'
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import config from './config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: enviroments[process.env.NODE_ENV] || '.env',
    load: [config],
    isGlobal: true,
  }),
  DatabaseModule,
  OrganizationsModule,
  TribesModule,
  RepositoriesModule,
  MetricsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
