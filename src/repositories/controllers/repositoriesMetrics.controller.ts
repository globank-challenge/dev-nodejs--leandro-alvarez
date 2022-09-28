import {
  Controller,
  Get,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  StreamableFile,
  Res
} from '@nestjs/common';

import { createReadStream } from 'fs';


import { join } from 'path';
import type { Response } from 'express';

import { RepositoriesService } from '../services/repositories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Endpoint para obtener métricas y archivo .csv')
@Controller('metadata')
export class RepositoriesMetricController {
  constructor(private repositoriesService: RepositoriesService) { }

  @Get('report/:tribuId')
  async getFile(@Param('tribuId', ParseIntPipe) tribuId: number,@Res({ passthrough: true }) res: Response): Promise<StreamableFile> {
    await this.repositoriesService.generateReport(tribuId)
    const file = createReadStream(join(process.cwd(), 'report.csv'));
    res.set({
      'Content-Type': 'text/plain',
      'Content-Disposition': 'attachment; filename="report.csv"',
    });
    return new StreamableFile(file);
  }

  @Get(':tribuId')
  @HttpCode(HttpStatus.ACCEPTED)
  getMetrics(@Param('tribuId', ParseIntPipe) tribuId: number) {
    return this.repositoriesService.getMetrics(tribuId);
  }
}
