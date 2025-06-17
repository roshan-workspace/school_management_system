import { Test, TestingModule } from '@nestjs/testing';
import { SectionSubjectService } from './section-subject.service';

describe('SectionSubjectService', () => {
  let service: SectionSubjectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SectionSubjectService],
    }).compile();

    service = module.get<SectionSubjectService>(SectionSubjectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
