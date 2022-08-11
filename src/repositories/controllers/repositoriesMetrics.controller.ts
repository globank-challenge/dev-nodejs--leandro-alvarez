import { Controller, Get, Query, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';

import { RepositoriesService } from '../services/repositories.service';

@Controller('repositories/metric')
export class RepositoriesMetricController {
  constructor(private repositoriesService: RepositoriesService) { }

  @Get(':tribuId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('tribuId', ParseIntPipe) tribuId: number) {
    return this.repositoriesService.getMetrics(tribuId);
  }

}
