import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TribesController } from './controllers/tribes.controller';
import { TribesService } from './services/tribes.service';
import { Tribes } from './entities/tribes.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Tribes])],
  controllers: [TribesController],
  providers: [TribesService],
})
export class TribesModule {}
