import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionSubjectDto } from './dto/create-section-subject.dto';
import { UpdateSectionSubjectDto } from './dto/update-section-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SectionSubject } from './entities/section-subject.entity';
import { Repository } from 'typeorm';
import { Section } from 'src/section/entities/section.entity';
import { Class } from 'src/class/entities/class.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Subject } from 'src/subject/entities/subject.entity';

@Injectable()
export class SectionSubjectService {
  constructor(
    @InjectRepository(SectionSubject)
    private sectionSubjectRepo: Repository<SectionSubject>,
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
    @InjectRepository(Class) private classRepo: Repository<Class>,
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
    @InjectRepository(Subject) private subjectRepo: Repository<Subject>,
  ) {}

  async create(dto: CreateSectionSubjectDto) {
    // Checking weather the section is valid or not
    const section = await this.sectionRepo.findOne({
      where: { sec_id: dto.sec_id },
      relations: ['class'],
    });

    if (!section) {
      throw new NotFoundException(`Section with ID ${dto.sec_id} not found`);
    }

    // Checking weather the subject is valid or not
    const subject = await this.subjectRepo.findOne({
      where: { subject_id: dto.subject_id },
    });
    if (!subject) {
      throw new NotFoundException(
        `Subject with ID ${dto.subject_id} not found`,
      );
    }
    // Checking weather the staff is valid or not
    const staff = await this.staffRepo.findOne({
      where: { staff_id: dto.staff_id },
    });
    if (!staff) {
      throw new NotFoundException(`staff with ID ${dto.staff_id} not found`);
    }

    const noOfPeriods = section.class.no_of_periods;

    // creating constraints for not having subjects more than the noOfPeriods count
    const assignedCount = await this.sectionSubjectRepo.count({
      where: { sec_id: dto.sec_id },
    });

    if (assignedCount >= noOfPeriods) {
      throw new BadRequestException(
        `Cannot assign more than ${noOfPeriods} subjects to this section.`,
      );
    }

    try {
      const sectionSubject = this.sectionSubjectRepo.create(dto);
      return await this.sectionSubjectRepo.save(sectionSubject);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'This section-subject assignment already exists.',
        );
      }
      throw new InternalServerErrorException(
        'Failed to create section-subject.',
      );
    }
  }

  async findAll() {
    try {
      const subjectSectionsInfo = await this.sectionSubjectRepo.find({
        relations: { subject: true, staff: true, section: { class: true } },
      });
      const requiredInfo = subjectSectionsInfo.map((ss) => {
        return {
          ID: ss.sec_sub_id,
          ClassName: ss.section.class.class_name,
          SectionName: ss.section.section_name,
          TeacherName: ss.staff.full_name,
          Subject: ss.subject.subject_name,
        };
      });

      return requiredInfo;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch all the section Subjects',
      );
    }
  }

  async findOne(id: number): Promise<SectionSubject> {
    try {
      const sectionSubject = await this.sectionSubjectRepo.findOne({
        where: { sec_sub_id: id },
        relations: ['section', 'staff', 'subject'], // Optional: include related data
      });

      if (!sectionSubject) {
        throw new NotFoundException(`SectionSubject with ID ${id} not found`);
      }

      return sectionSubject;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch SectionSubject with ID ${id}`,
      );
    }
  }

  async update(
    id: number,
    updateDto: UpdateSectionSubjectDto,
  ): Promise<SectionSubject> {
    try {
      const existing = await this.sectionSubjectRepo.findOne({
        where: { sec_sub_id: id },
      });

      if (!existing) {
        throw new NotFoundException(`SectionSubject with ID ${id} not found`);
      }

      // Optional: validate new references if any are being updated
      if (updateDto.sec_id) {
        const section = await this.sectionRepo.findOne({
          where: { sec_id: updateDto.sec_id },
        });
        if (!section) {
          throw new NotFoundException(
            `Section with ID ${updateDto.sec_id} not found`,
          );
        }
      }

      if (updateDto.staff_id) {
        const staff = await this.staffRepo.findOne({
          where: { staff_id: updateDto.staff_id },
        });
        if (!staff) {
          throw new NotFoundException(
            `Staff with ID ${updateDto.staff_id} not found`,
          );
        }
      }

      if (updateDto.subject_id) {
        const subject = await this.subjectRepo.findOne({
          where: { subject_id: updateDto.subject_id },
        });
        if (!subject) {
          throw new NotFoundException(
            `Subject with ID ${updateDto.subject_id} not found`,
          );
        }
      }

      const updated = this.sectionSubjectRepo.merge(existing, updateDto);
      return await this.sectionSubjectRepo.save(updated);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'This section-subject assignment already exists.',
        );
      }
      throw new InternalServerErrorException(
        'Failed to update SectionSubject.',
      );
    }
  }

  remove(id: number) {
    try {
      const sectionSubjects = this.sectionSubjectRepo.findOne({
        where: { sec_sub_id: id },
      });
      if (!sectionSubjects) {
        throw new NotFoundException(
          `Section Subjects not Found with this id:${id}`,
        );
      }

      this.sectionSubjectRepo.delete(id);
      return { message: 'Subject Section Deleted Successfully' };
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete Subject section`,
      );
    }
  }
}
