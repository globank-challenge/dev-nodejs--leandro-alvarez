import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RepositoriesController } from './controllers/repositories.controller';
import { RepositoriesService } from './services/repositories.service';
import { Repositories } from './entities/repositories.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Repositories])],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
  exports: [RepositoriesService]
})
export class RepositoriesModule {}
