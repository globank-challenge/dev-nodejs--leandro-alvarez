import {
  Controller,
  Get,
  Query,
  Param,
  Body,
  Post,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';

import { TribesService } from '../services/tribes.service';
import { CreateTribeDto, UpdateTribeDto } from '../dtos/tribes.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Entidad Tribes')
@Controller('tribes')
export class TribesController {
  constructor(private tribesService: TribesService) { }

  @Get()
  getTribues() {
    return this.tribesService.findAll();
  }
  //aquí
  @Get(':tribeId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('tribeId', ParseIntPipe) tribeId: number) {
    return this.tribesService.findOne(tribeId);
  }

  @Post()
  create(@Body() payload: CreateTribeDto) {
    return this.tribesService.create(payload);
  }

  @Put(':tribeId')
  update(@Param('tribeId', ParseIntPipe) tribeId: number, @Body() payload: UpdateTribeDto) {
    return this.tribesService.update(tribeId, payload);
  }

  @Delete(':tribuId')
  delete(@Param('tribuId', ParseIntPipe) tribuId: number) {
    return this.tribesService.remove(tribuId);
  }

}
