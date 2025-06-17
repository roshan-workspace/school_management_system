import { Test, TestingModule } from '@nestjs/testing';
import { SectionSubjectController } from './section-subject.controller';
import { SectionSubjectService } from './section-subject.service';

describe('SectionSubjectController', () => {
  let controller: SectionSubjectController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SectionSubjectController],
      providers: [SectionSubjectService],
    }).compile();

    controller = module.get<SectionSubjectController>(SectionSubjectController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
