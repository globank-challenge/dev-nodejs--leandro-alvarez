import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tribes } from '../entities/tribes.entity'
import { CreateTribeDto,UpdateTribeDto} from '../dtos/tribes.dto';

@Injectable()
export class TribesService {
  constructor(
    @InjectRepository(Tribes) private tribeRepo:Repository<Tribes>,
  ){}


  create(data: CreateTribeDto) {
    const newTribe = this.tribeRepo.create(data);
    return this.tribeRepo.save(newTribe);
  }

  findAll() {
    //return this.organizations;
    return this.tribeRepo.find();
  }

  async findOne(id_tribe: number) {
    const tribe = await this.tribeRepo.findOneBy({
      id_tribe: id_tribe
  });
    if (!tribe) {
      throw new NotFoundException(`Tribe #${id_tribe} not found`);
    }
    return tribe;
  }

  async update(id_tribe: number, changes: UpdateTribeDto) {
    const tribe = await this.tribeRepo.findOneBy({
      id_tribe: id_tribe
  });
  if (!tribe) {
    throw new NotFoundException(`Tribe #${id_tribe} not found`);
  }
    this.tribeRepo.merge(tribe, changes);
    return this.tribeRepo.save(tribe);
  }

  remove(id: number) {
    return this.tribeRepo.delete(id);
  }
}
