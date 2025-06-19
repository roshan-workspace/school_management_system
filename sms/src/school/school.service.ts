import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSchoolDto } from './dto/create-school.dto';
import { School } from './entity/school.entity';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
  ) {}

  async create(dto: CreateSchoolDto): Promise<School> {
    try {
      const newSchool = this.schoolRepo.create(dto);
      return await this.schoolRepo.save(newSchool);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('School already exists');
      }
      console.error('Create School Error:', error);
      throw new InternalServerErrorException('Failed to create school');
    }
  }

 async findAll() {
  try {
    const schools = await this.schoolRepo
      .createQueryBuilder('school')
      .leftJoin('school.academicYears', 'academicYear')
      .leftJoin('school.classes', 'class')
      .leftJoin('school.admissions', 'admission')
      .leftJoin('school.staffs', 'staff')
      .select('school.school_id', 'school_id')
      .addSelect('school.school_name', 'school_name')
      .addSelect('COUNT(DISTINCT academicYear.id)', 'academicYearCount')
      .addSelect('COUNT(DISTINCT class.class_id)', 'classCount')
      .addSelect('COUNT(DISTINCT admission.adm_id)', 'admissionCount')
      .addSelect('COUNT(DISTINCT staff.staff_id)', 'staffCount')
      .groupBy('school.school_id')
      .addGroupBy('school.school_name')
      .getRawMany();

    return schools.map((s) => ({
      school_id: Number(s.school_id),
      school_name: s.school_name,
      academicYearCount: Number(s.academicYearCount),
      classCount: Number(s.classCount),
      admissionCount: Number(s.admissionCount),
      staffCount: Number(s.staffCount),
    }));
  } catch (error) {
    console.error('Find All Schools (Count Summary) Error:', error);
    throw new InternalServerErrorException('Failed to retrieve school summaries');
  }
}


 async findOne(id: number): Promise<{
  school_id: number;
  school_name: string;
  academicYearCount: number;
  classCount: number;
  admissionCount: number;
  staffCount: number;
}> {
  try {
    const result = await this.schoolRepo
      .createQueryBuilder('school')
      .leftJoin('school.academicYears', 'academicYear')
      .leftJoin('school.classes', 'class')
      .leftJoin('school.admissions', 'admission')
      .leftJoin('school.staffs', 'staff')
      .select('school.school_id', 'school_id')
      .addSelect('school.school_name', 'school_name')
      .addSelect('COUNT(DISTINCT academicYear.id)', 'academicYearCount')
      .addSelect('COUNT(DISTINCT class.class_id)', 'classCount')
      .addSelect('COUNT(DISTINCT admission.adm_id)', 'admissionCount')
      .addSelect('COUNT(DISTINCT staff.staff_id)', 'staffCount')
      .where('school.school_id = :id', { id })
      .groupBy('school.school_id')
      .addGroupBy('school.school_name')
      .getRawOne();

    if (!result) {
      throw new NotFoundException(`School with id ${id} not found`);
    }

    return {
      school_id: Number(result.school_id),
      school_name: result.school_name,
      academicYearCount: Number(result.academicYearCount),
      classCount: Number(result.classCount),
      admissionCount: Number(result.admissionCount),
      staffCount: Number(result.staffCount),
    };
  } catch (error) {
    console.error('Find School Count Summary Error:', error);
    throw new InternalServerErrorException('Failed to retrieve school summary');
  }
}


  async update(id: number, dto: UpdateSchoolDto): Promise<School> {
    const school = await this.schoolRepo.findOne({ where: { school_id: id } });

    if (!school) {
      throw new NotFoundException(`School with id ${id} not found`);
    }

    Object.assign(school, dto);

    try {
      return await this.schoolRepo.save(school);
    } catch (error) {
      console.error('Update School Error:', error);
      throw new InternalServerErrorException('Failed to update school');
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    const school = await this.schoolRepo.findOne({ where: { school_id: id } });

    if (!school) {
      throw new NotFoundException(`School with id ${id} not found`);
    }

    try {
      await this.schoolRepo.remove(school);
      return { message: `School with id ${id} has been deleted.` };
    } catch (error) {
      console.error('Delete School Error:', error);
      throw new InternalServerErrorException('Failed to delete school');
    }
  }
}
