import { Injectable, NotFoundException ,Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository,MoreThan } from 'typeorm';
import { map } from 'rxjs/operators';

const http = require('http');

import { Repositories, repoStates, registerStates} from '../entities/repositories.entity'
import { CreateRepositoryDto, UpdateRepositoryDto } from '../dtos/repositories.dto';

import { TribesService } from './../../tribes/services/tribes.service'

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(Repositories) private repositoriesRepo: Repository<Repositories>,
    @Inject('TASKS') private tasks: any[],
    private tribesService:TribesService,

  ) { }


  getApiRepositorios(): string {
    var res =  this.tasks
    return `${res}`;
  }


  async create(data: CreateRepositoryDto) {
    const newRepository = this.repositoriesRepo.create(data);
    if (data.tribeId) {
      const tribe = await this.tribesService.findOne(data.tribeId);
      newRepository.tribe = tribe;
    }else{
      throw new NotFoundException(`tribeId is required`);
    }
    return this.repositoriesRepo.save(newRepository);
  }

  findAll() {
    //return this.organizations;
    return this.repositoriesRepo.find({
      relations: ['tribe','metrics'],
    });
  }

  async findOne(id_repository: number) {
    const repository = await this.repositoriesRepo.findOne({
      where:{id_repository: id_repository},
      relations:['tribe','metrics']
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
    if (changes.tribeId) {
      const tribe = await this.tribesService.findOne(changes.tribeId);
      repository.tribe = tribe;
    }

    this.repositoriesRepo.merge(repository, changes);
    return this.repositoriesRepo.save(repository);
  }

  remove(id: number) {
    return this.repositoriesRepo.delete(id);
  }


  async getMetrics(idTribu: number){


    var mockRepositorios =  this.tasks
    const tribe= await this.tribesService.findOne(idTribu);
    if (!tribe) {
      throw new NotFoundException(`La Tribu no se encuentra registrada`);
    }

    var metricas = await this.repositoriesRepo.find({
      relations:['tribe','metrics','tribe.organization'],
      where:{
        tribe:{
          id_tribe:idTribu,
        },
        metrics:{
          coverage:MoreThan(75),
        },
        state:repoStates.ENABLE,
      },

    });

    if (!metricas){
      throw new NotFoundException(`La Tribu no tiene repositorios que cumplan con la cobertura necesaria`);
    }

    console.log(mockRepositorios)


    return metricas
  }
}
