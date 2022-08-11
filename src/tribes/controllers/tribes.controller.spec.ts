import { Test, TestingModule } from '@nestjs/testing';
import { TribesController } from './tribes.controller';

describe('Controller', () => {
  let controller: TribesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TribesController],
    }).compile();

    controller = module.get<TribesController>(TribesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
