import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicYear } from './entity/academic-year.entity';

@Injectable()
export class AcademicYearService {
  constructor(
    @InjectRepository(AcademicYear)
    private academicYearRepo: Repository<AcademicYear>,
  ) {}


  async create(createAcademicYearDto: CreateAcademicYearDto) {
    try {
      const academicYear = this.academicYearRepo.create(createAcademicYearDto);
      return await this.academicYearRepo.save(academicYear);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Academic year must be unique.');
      }
      console.log(error);
      throw new InternalServerErrorException(error.detail);
    }
  }


  async findAll() {
    try {
      return await this.academicYearRepo.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch academic years.');
    }
  }



 async findOne(id: number) {
    try {
      const year = await this.academicYearRepo.findOne({ where: { id } });
      if (!year) {
        throw new NotFoundException(`Academic year with ID ${id} not found.`);
      }
      return year;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Failed to fetch academic year.');
    }
  }



  async update(id: number, updateAcademicYearDto: UpdateAcademicYearDto) {
    try {
      const year = await this.academicYearRepo.preload({
        id,
        ...updateAcademicYearDto,
      });

      if (!year) {
        throw new NotFoundException(`Academic year with ID ${id} not found.`);
      }

      return await this.academicYearRepo.save(year);
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException('Duplicate academic year not allowed.');
      }
      throw new InternalServerErrorException('Failed to update academic year.');
    }
  }



 async remove(id: number) {
    try {
      const result = await this.academicYearRepo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Academic year with ID ${id} not found.`);
      }
      return { message: 'Academic year deleted successfully.' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete academic year.');
    }
  }
}
