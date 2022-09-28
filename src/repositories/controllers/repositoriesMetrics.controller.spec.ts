import { Test, TestingModule } from "@nestjs/testing";
import { HttpModule, HttpService } from '@nestjs/axios';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';

import { RepositoriesMetricController } from './repositoriesMetrics.controller';
import { RepositoriesService } from '../services/repositories.service';
import { Repositories } from '../entities/repositories.entity';

import { TribesService } from '../../tribes/services/tribes.service';
import { Tribes } from '../../tribes/entities/tribes.entity';

import { OrganizationsService } from '../../organizations/services/organizations.service'
import { Organization } from '../../organizations/entities/organizations.entity'

import { Metrics } from '../../metrics/entities/metrics.entity'

describe("Repositories Metrics", () => {
  let metricsController: RepositoriesMetricController;
  const idTribeNonExistent = 111
  const idTribeNonAverage = 222
  const idTribeAllRigth = 1


  const oneTribe: Tribes = plainToClass(Tribes, { id_tribe: idTribeAllRigth, name: 'mockTribe', status: 1 });
  const mockedTribes = {
    findOne: jest.fn((query) => (query.where.id_tribe == oneTribe.id_tribe || query.where.id_tribe == idTribeNonAverage)
      ? Promise.resolve(oneTribe)
      : Promise.resolve(undefined))
  }

  const metricsRepositoriesMocked: Repositories = plainToClass(Repositories, {
    id_repository: 9,
    name: 'mockRepository1',
    state: 'E',
    create_time: '2022-08-11T17:22:00.844Z',
    tribe: plainToClass(Tribes, {
      id_tribe: idTribeAllRigth,
      name: 'mockTribe1',
      organization: plainToClass(Organization, {
        name: 'mockOrganization1'
      }),
    }),
    metrics: plainToClass(Metrics, {
      coverage: '80',
      bugs: '0',
      vulnerabilities: '640',
      hostpot: '0',
      code_smells: '640'
    })
  });
  const mockedRepositories = {
    find: jest.fn((query) => query.where.tribe.id_tribe == idTribeNonAverage ? Promise.resolve(undefined) : Promise.resolve([
      metricsRepositoriesMocked,
      metricsRepositoriesMocked
    ]))
  }

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesMetricController],
      providers: [
        {
          provide: getRepositoryToken(Repositories),
          useValue: mockedRepositories,
        },
        {
          provide: getRepositoryToken(Tribes),
          useValue: mockedTribes,
        },
        {
          provide: getRepositoryToken(Organization),
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn()
          }
        },
        {
          provide: 'AXIOS_INSTANCE_TOKEN',
          useValue: {
            get: jest.fn(() => Promise.resolve({
              data: [
                {
                  "id": 9,
                  "state": 604
                },
                {
                  "id": 10,
                  "state": 605
                },
                {
                  "id": 11,
                  "state": 606
                }
              ]
            }))
          },
        },
        RepositoriesService,
        TribesService,
        OrganizationsService,
        HttpService
      ],
      imports: [HttpModule]
    }).compile();
    metricsController = app.get<RepositoriesMetricController>(RepositoriesMetricController);
  });

  it('Tribu inexistente', async () => {
    let responseError: string
    let idTribu: number = idTribeNonExistent
    expect(metricsController).toBeDefined();
    try {
      const respmock = await metricsController.getMetrics(idTribu)
      //console.log('respmock',respmock)
      responseError = '200'
    } catch (error) {
      //console.log('error response', error.response)
      responseError = error.response.message;
    }

    expect(responseError).toBe('La Tribu no se encuentra registrada')
  });

  it('Metricas de repositorio por Tribu e Información de Verificación', async () => {

    interface ModelResponse {
      id: number;
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

    const verificationCode = [
      "Verificado",
      "En espera",
      "Aprobado",
      'No encontrado'
    ]

    let idTribu: number = idTribeAllRigth

    expect(metricsController).toBeDefined();
    const metricas: ModelResponse[] = await metricsController.getMetrics(idTribu)

    expect(metricas.length).toBeGreaterThan(0);
    expect(typeof metricas).toBe('object')
    expect(metricas[0]).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      tribe: expect.any(String),
      organization: expect.any(String),
      coverage: expect.any(String),
      codeSmells: expect.any(Number),
      bugs: expect.any(Number),
      vulnerabilities: expect.any(Number),
      hotspots: expect.any(Number),
      verificationState: expect.any(String),
      state: expect.any(String)
    })

    //it('Información de verificación', async () => {
    expect(metricas[0].verificationState == 'Verificado'
      || metricas[0].verificationState == 'En espera'
      || metricas[0].verificationState == 'Aprobado'
      || metricas[0].verificationState == 'No encontrado'
    ).toBe(true)
    //})

  });

  it('Repositorios que no cumplen cobertura', async () => {
    let idTribu: number = idTribeNonAverage
    let responseError: string
    expect(metricsController).toBeDefined();

    //expect(await metricsController.getMetrics(idTribu)).toThrow('La Tribu no tiene repositorios que cumplan con la cobertura necesaria')

    expect(metricsController).toBeDefined();
    try {
      await metricsController.getMetrics(idTribu)
      responseError = '200'
    } catch (error) {
      responseError = error.response.message;
    }

    expect(responseError).toBe('La Tribu no tiene repositorios que cumplan con la cobertura necesaria')

  })

});
