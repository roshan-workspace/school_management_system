import { Injectable } from '@nestjs/common';

import { CustomSchoolRepository } from './repo/school.repository';

@Injectable()
export class SchoolService {
  constructor(private readonly SchoolRepo: CustomSchoolRepository) {}

  async SchoolInfo() {
    return await this.SchoolRepo.getSchoolInfo()
  }
}
