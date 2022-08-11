import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Repositories } from '../entities/repositories.entity'
import { CreateRepositoryDto, UpdateRepositoryDto } from '../dtos/repositories.dto';

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(Repositories) private repositoriesRepo: Repository<Repositories>,
  ) { }


  create(data: CreateRepositoryDto) {
    const newRepository = this.repositoriesRepo.create(data);
    return this.repositoriesRepo.save(newRepository);
  }

  findAll() {
    //return this.organizations;
    return this.repositoriesRepo.find();
  }

  async findOne(id_repository: number) {
    const repository = await this.repositoriesRepo.findOneBy({
      id_repository: id_repository
    });
    if (!repository) {
      throw new NotFoundException(`Repository #${id_repository} not found`);
    }
    return repository;
  }

  async update(id_repository: number, changes: UpdateRepositoryDto) {
    const repository = await this.repositoriesRepo.findOneBy({
      id_repository: id_repository
    });
    if (!repository) {
      throw new NotFoundException(`Repository #${id_repository} not found`);
    }
    this.repositoriesRepo.merge(repository, changes);
    return this.repositoriesRepo.save(repository);
  }

  remove(id: number) {
    return this.repositoriesRepo.delete(id);
  }
}
