import { Controller, Get, Query, Param, Body, Post, Put, Delete, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';

import { RepositoriesService } from '../services/repositories.service';
import { CreateRepositoryDto, UpdateRepositoryDto } from '../dtos/repositories.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Entidad Repositories')
@Controller('repositories')
export class RepositoriesController {
  constructor(private repositoriesService: RepositoriesService) { }

  @Get()
  getRepositories() {
    return this.repositoriesService.findAll();
  }

  @Get(':repoId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('repoId', ParseIntPipe) repoId: number) {
    return this.repositoriesService.findOne(repoId);
  }

  @Post()
  create(@Body() payload: CreateRepositoryDto) {
    return this.repositoriesService.create(payload);
  }

  @Put(':repoId')
  update(@Param('repoId', ParseIntPipe) repoId: number, @Body() payload: UpdateRepositoryDto) {
    return this.repositoriesService.update(repoId, payload);
  }

  @Delete(':repoId')
  delete(@Param('repoId', ParseIntPipe) repoId: number) {
    return this.repositoriesService.remove(repoId);
  }

}
