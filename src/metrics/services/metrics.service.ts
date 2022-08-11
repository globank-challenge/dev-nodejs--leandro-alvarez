import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Metrics } from '../entities/metrics.entity'
import { CreateMetricsDto,UpdateMetricsDto} from '../dtos/metrics.dto';
import {RepositoriesService} from './../../repositories/services/repositories.service'

@Injectable()
export class MetricsService {
  constructor(
    @InjectRepository(Metrics) private metricsRepo:Repository<Metrics>,
    private repositoriesService:RepositoriesService
  ){}


  async create(data: CreateMetricsDto) {
    const newMetrics = this.metricsRepo.create(data);

    const repository = await this.repositoriesService.findOne(data.id_repository);
    if (!repository) {
      throw new NotFoundException(`Repository #${data.id_repository} not found`);
    }
    newMetrics.repository =repository;

    return this.metricsRepo.save(newMetrics);
  }



  findAll() {
    //return this.organizations;
    return this.metricsRepo.find();
  }

  async findOne(id_repository: number) {
    const metrics = await this.metricsRepo.findOneBy({
      id_repository: id_repository
  });
    if (!metrics) {
      throw new NotFoundException(`Metric #${id_repository} not found`);
    }
    return metrics;
  }

  async update(id_repository: number, changes: UpdateMetricsDto) {
    const metrics = await this.metricsRepo.findOneBy({
      id_repository: id_repository
  });
  if (!metrics) {
    throw new NotFoundException(`Metrics #${id_repository} not found`);
  }
    this.metricsRepo.merge(metrics, changes);
    return this.metricsRepo.save(metrics);
  }

  remove(id: number) {
    return this.metricsRepo.delete(id);
  }
}
