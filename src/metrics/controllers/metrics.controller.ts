import { Controller, Get, Query, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';

import { MetricsService } from '../services/metrics.service';
import { CreateMetricsDto, UpdateMetricsDto } from '../dtos/metrics.dto';

@Controller('metrics')
export class MetricsController {
  constructor(private metricsService: MetricsService) { }

  @Get()
  getMetrics() {
    return this.metricsService.findAll();
  }

  @Get(':metricId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('metricId', ParseIntPipe) metricId: number) {
    return this.metricsService.findOne(metricId);
  }

  @Post()
  create(@Body() payload: CreateMetricsDto) {
    return this.metricsService.create(payload);
  }

  @Put(':metricId')
  update(@Param('metricId', ParseIntPipe) metricId: number, @Body() payload: UpdateMetricsDto) {
    return this.metricsService.update(metricId, payload);
  }

  @Delete(':metricId')
  delete(@Param('metricId', ParseIntPipe) metricId: number) {
    return this.metricsService.remove(metricId);
  }

}
