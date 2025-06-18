import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async create(dto: CreateSubjectDto) {
    try {
      const subject = this.subjectRepo.create(dto);
      return await this.subjectRepo.save(subject);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Subject with this name already exists.');
      }
      throw new InternalServerErrorException('Failed to create subject.');
    }
  }

  async findAll() {
    try {
      return await this.subjectRepo.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch subjects.');
    }
  }

  async findOne(id: number) {
    try {
      const subject = await this.subjectRepo.findOne({ where: { subject_id: id } });
      if (!subject) {
        throw new NotFoundException(`Subject with id ${id} not found.`);
      }
      return subject;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch subject.');
    }
  }

  async update(id: number, dto: UpdateSubjectDto) {
    try {
      const existing = await this.subjectRepo.preload({ subject_id: id, ...dto });
      if (!existing) {
        throw new NotFoundException(`Subject with id ${id} not found.`);
      }
      return await this.subjectRepo.save(existing);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update subject.');
    }
  }

  async remove(id: number) {
    try {
      const subject = await this.subjectRepo.findOne({ where: { subject_id: id } });
      if (!subject) {
        throw new NotFoundException(`Subject with id ${id} not found.`);
      }
      await this.subjectRepo.remove(subject);
      return { message: `Subject with id ${id} deleted successfully.` };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete subject.');
    }
  }
}

