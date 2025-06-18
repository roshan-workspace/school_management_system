import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admission } from './entities/admission.entity';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';
import { Student } from './entities/student.entity';
import { Guardian } from 'src/guardian/entities/guardian.entity';
import { School } from 'src/school/entity/school.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { Section } from 'src/section/entities/section.entity';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Admission)
    private readonly admissionRepo: Repository<Admission>,
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Guardian)
    private readonly guardianRepo: Repository<Guardian>,
    @InjectRepository(School)
    private readonly schoolRepo: Repository<School>,
    @InjectRepository(Section)
    private readonly sectionRepo: Repository<Section>,
  ) {}

  async create(dto: CreateAdmissionDto) {
    const guardian = await this.guardianRepo.findOne({
      where: { grdn_id: dto.grdn_id },
    });
    if (!guardian) {
      throw new NotFoundException(`Guardian with ID ${dto.grdn_id} not found`);
    }

    const school = await this.schoolRepo.findOne({
      where: { school_id: dto.school_id },
    });
    if (!school) {
      throw new NotFoundException(`school with ID ${dto.school_id} not found`);
    }

    try {
      const admission = this.admissionRepo.create(dto);
      return await this.admissionRepo.save(admission);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create admission');
    }
  }

  async findAll() {
    // return await this.admissionRepo.find({ relations: ['guardian'] });
    return await this.admissionRepo.find();
  }

  async findOne(id: number) {
    const admission = await this.admissionRepo.findOne({
      where: { adm_id: id },
      relations: ['guardian'],
    });
    if (!admission)
      throw new NotFoundException(`Admission with ID ${id} not found`);
    return admission;
  }

  async update(id: number, dto: UpdateAdmissionDto) {
    if (dto.grdn_id) {
      const guardian = await this.guardianRepo.findOne({
        where: { grdn_id: dto.grdn_id },
      });
      if (!guardian) {
        throw new NotFoundException(
          `Guardian with ID ${dto.grdn_id} not found`,
        );
      }
    }

    if (dto.school_id) {
      const school = await this.schoolRepo.findOne({
        where: { school_id: dto.school_id },
      });
      if (!school) {
        throw new NotFoundException(
          `school with ID ${dto.school_id} not found`,
        );
      }
    }

    const admission = await this.admissionRepo.preload({ adm_id: id, ...dto });
    if (!admission)
      throw new NotFoundException(`Admission with ID ${id} not found`);

    try {
      return await this.admissionRepo.save(admission);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update admission');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.admissionRepo.delete(id);
      if (result.affected === 0)
        throw new NotFoundException(`Admission with ID ${id} not found`);
      return { message: 'Admission deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete admission');
    }
  }

  async createStudent(dto: CreateStudentDto) {
    const section = await this.sectionRepo.findOne({
      where: { sec_id: dto.sec_id },
    });
    if (!section) {
      throw new NotFoundException(`Section with ID ${dto.sec_id} not found`);
    }

    const admission = await this.admissionRepo.findOne({
      where: { adm_id: dto.adm_id },
    });
    if (!admission) {
      throw new NotFoundException(`Admission with ID ${dto.adm_id} not found`);
    }

    const existing = await this.studentRepo.findOne({
      where: {
        section: { sec_id: dto.sec_id },
        admission: { adm_id: dto.adm_id },
      },
    });

    if (existing)
      throw new ConflictException(
        'Student already exists for this section and admission',
      );

    try {
      const newStudent = this.studentRepo.create({
        section,
        admission,
      });
      return await this.studentRepo.save(newStudent);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create new student');
    }
  }

  async findAllStudent(): Promise<Student[]> {
    try {
      return await this.studentRepo.find({
        relations: ['section', 'admission'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch students');
    }
  }

  async findOneStudentById(id: number): Promise<Student> {
    try {
      const student = await this.studentRepo.findOne({
        where: { stud_id: id },
        relations: ['section', 'admission'],
      });

      if (!student)
        throw new NotFoundException(`Student with ID ${id} not found`);

      return student;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching student with ID ${id}`,
      );
    }
  }


    async updateStudent(id: number, dto: UpdateStudentDto) {
    if (dto.sec_id) {
      const section = await this.sectionRepo.findOne({
        where: { sec_id: dto.sec_id },
      });
      if (!section) {
        throw new NotFoundException(
          `Section with ID ${dto.sec_id} not found`,
        );
      }
    }

    if (dto.adm_id) {
      const admission = await this.admissionRepo.findOne({
        where: { adm_id: dto.adm_id },
      });
      if (!admission) {
        throw new NotFoundException(
          `Admission with ID ${dto.adm_id} not found`,
        );
      }
    }

    const student = await this.studentRepo.preload({ stud_id: id, ...dto });
    if (!student)
      throw new NotFoundException(`Student with ID ${id} not found`);

    try {
      return await this.studentRepo.save(student);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update student');
    }
  }


 async removeStudent(id: number) {
    try {
      const result = await this.studentRepo.delete(id);
      if (result.affected === 0)
        throw new NotFoundException(`Admission with ID ${id} not found`);
      return { message: 'Admission deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete admission');
    }
  }

}
