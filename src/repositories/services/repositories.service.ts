import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository, MoreThan, Between } from 'typeorm';
import fs from 'fs';
import { parse } from 'json2csv';


import { Repositories, repoStates, registerStates } from '../entities/repositories.entity'
import { CreateRepositoryDto, UpdateRepositoryDto } from '../dtos/repositories.dto';

import { TribesService } from './../../tribes/services/tribes.service'
import { json } from 'stream/consumers';


@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(Repositories) private repositoriesRepo: Repository<Repositories>,
    @Inject('MockRepositories') private mockRepos: any[],
    @Inject('MockRepositories2') private mockRepos2: any[],
    private tribesService: TribesService,

  ) { }



  getApiRepositorios(): string {
    var res = this.mockRepos
    return `${res}`;
  }


  async create(data: CreateRepositoryDto) {
    const newRepository = this.repositoriesRepo.create(data);
    if (data.tribeId) {
      const tribe = await this.tribesService.findOne(data.tribeId);
      newRepository.tribe = tribe;
    } else {
      throw new NotFoundException(`tribeId is required`);
    }
    return this.repositoriesRepo.save(newRepository);
  }

  findAll() {
    //return this.organizations;
    return this.repositoriesRepo.find({
      relations: ['tribe', 'metrics'],
    });
  }

  async findOne(id_repository: number) {
    const repository = await this.repositoriesRepo.findOne({
      where: { id_repository: id_repository },
      relations: ['tribe', 'metrics']
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


  async getMetrics(idTribu: number) {

    const verificationCode = [
      //{ code: 0, state: "No encontrado" },
      { code: 604, state: "Verificado" },
      { code: 605, state: "En espera" },
      { code: 606, state: "Aprobado" },
    ]

    interface ModelResponse {
      id: string;
      name: string;
      tribe: string;
      organization: string;
      coverage: string;
      codeSmells: number;
      bugs: number;
      vulnerabilities: number;
      hotspots: number;
      verificationState: string;
      state: string;
    }

    const minCoverage: number = 75;
    const thisYear: number = new Date().getFullYear()
    const dateFrom = new Date(thisYear, 1, 1)
    const dateTo = new Date(thisYear, 12, 31)

    const dataMock: any = JSON.parse(JSON.stringify(this.mockRepos));
    const searchMock: number = dataMock?.find((repo) => repo.id == idTribu)?.state || 0
    const stateRepositoryMock: string = verificationCode.find((code) => code.code == searchMock)?.state || "No encontrado"


    const tribe = await this.tribesService.findOne(idTribu);
    if (!tribe) {
      throw new NotFoundException(`La Tribu no se encuentra registrada`);
    }

    const metricas: Repositories[] = await this.repositoriesRepo.find({
      relations: ['tribe', 'metrics', 'tribe.organization'],
      select: {
        id_repository: true,
        name: true,
        tribe: {
          name: true,
          organization: {
            name: true,
          }
        },
        metrics: {
          coverage: true,
          code_smells: true,
          bugs: true,
          vulnerabilities: true,
          hostpot: true,
        },
        state: true,
        create_time: true,
      },
      where: {
        create_time: Between(dateFrom, dateTo),
        tribe: {
          id_tribe: idTribu,
        },
        metrics: {
          coverage: MoreThan(minCoverage),
        },
        state: repoStates.ENABLE,
      }
    })

    if (!metricas) {
      throw new NotFoundException(`La Tribu no tiene repositorios que cumplan con la cobertura necesaria`);
    }

    var modelResponse: ModelResponse[] = [];
    metricas.forEach(repo => {
      const data = JSON.parse(JSON.stringify(repo));
      let datamodel: ModelResponse = {
        id: data.id_repository,
        name: data.name,
        tribe: data.tribe.name,
        organization: data.tribe.organization.name,
        coverage: data.metrics.coverage,
        codeSmells: data.metrics.code_smells,
        bugs: data.metrics.bugs,
        vulnerabilities: data.metrics.vulnerabilities,
        hotspots: data.metrics.hostpot,
        verificationState: stateRepositoryMock,
        state: data.state,
      }
      modelResponse.push(datamodel)
    })

    const response = JSON.parse(JSON.stringify(modelResponse))

    return response
  }
}
