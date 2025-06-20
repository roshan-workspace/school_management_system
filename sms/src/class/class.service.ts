import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { Repository } from 'typeorm';
import { School } from 'src/school/entity/school.entity';
import { AcademicYear } from 'src/academic-year/entity/academic-year.entity';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class) private classRepo: Repository<Class>,
    @InjectRepository(School) private schoolRepo: Repository<School>,
    @InjectRepository(AcademicYear)
    private academicRepo: Repository<AcademicYear>,
  ) {}

  async create(dto: CreateClassDto) {
    const school = await this.schoolRepo.findOne({
      where: { school_id: dto.school_id },
    });
    if (!school) {
      throw new NotFoundException(
        `School with the id ${dto.school_id} does not exits`,
      );
    }

    const academic_year = await this.academicRepo.findOne({
      where: { id: dto.acad_year_id },
    });
    if (!academic_year) {
      throw new NotFoundException(
        `Academic Year with the id ${dto.acad_year_id} does not exits`,
      );
    }

    try {
      const newClass = this.classRepo.create(dto);
      return await this.classRepo.save(newClass);
    } catch (error) {
      if (error.code == 23505) {
        throw new BadRequestException('Class already exists');
      }
      throw new InternalServerErrorException('Failed to create new class');
    }
  }

  async findAll() {
    try {
      const classes = await this.classRepo.find({
        relations: { sections: true },
      });

      const requiredInfo = classes.map((cls, i) => {
        return {
          ClassID: cls.class_id,
          ClassName: cls.class_name,
          NoOfPeriods: cls.no_of_periods,
          Sections: cls.sections.map((sec) => (cls.class_name+"-"+sec.section_name)),
        };
      });

      return requiredInfo;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch classes.');
    }
  }

  async findOne(id: number) {
    const cls = await this.classRepo.findOne({
      where: { class_id: id },
      relations: { sections: true },
    });

    if (!cls) {
      throw new NotFoundException(`Class ID ${id} not found`);
    }
    return cls;
  }

  async update(id: number, dto: UpdateClassDto) {
    const cls = await this.classRepo.preload({ class_id: id, ...dto });
    if (!cls) {
      throw new NotFoundException(`Class ID ${id} not found`);
    }

    if (dto.school_id) {
      const school = await this.schoolRepo.findOne({
        where: { school_id: dto.school_id },
      });
      if (!school) {
        throw new NotFoundException(
          `School with the id ${dto.school_id} does not exits`,
        );
      }
    }

    if (dto.acad_year_id) {
      const academic_year = await this.academicRepo.findOne({
        where: { id: dto.acad_year_id },
      });
      if (!academic_year) {
        throw new NotFoundException(
          `Academic Year with the id ${dto.acad_year_id} does not exits`,
        );
      }
    }

    try {
      return await this.classRepo.save(cls);
    } catch (error) {
      if (error.code == 23505) {
        throw new BadRequestException(`Class has already this class Name`);
      }
      throw new InternalServerErrorException('Failed to update class');
    }
  }

  async remove(id: number) {
    const cls = await this.classRepo.findOne({ where: { class_id: id } });
    if (!cls) {
      throw new NotFoundException(`Class Not Found`);
    }
    try {
      await this.classRepo.delete(id);
      return { message: 'Class deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete class');
    }
  }
}
