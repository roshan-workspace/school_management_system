import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Section } from './entities/section.entity';
import { Repository } from 'typeorm';
import { Class } from 'src/class/entities/class.entity';

@Injectable()
export class SectionService {
  constructor(
    @InjectRepository(Section) private sectionRepo: Repository<Section>,
    @InjectRepository(Class) private classRepo: Repository<Class>,
  ) {}

  async create(dto: CreateSectionDto) {
    const cls = await this.classRepo.findOne({
      where: { class_id: dto.class_id },
    });
    if (!cls) {
      throw new NotFoundException(
        `Class does not exits with id ${dto.class_id}`,
      );
    }

    try {
      const newSection = this.sectionRepo.create(dto);
      return await this.sectionRepo.save(newSection);
    } catch (error) {
      if ((error.code == 23505)) {
        throw new BadRequestException('Section already exits on this class');
      }
      throw new InternalServerErrorException('Failed to create new class');
    }
  }

  async findAll() {
    try {
      return await this.sectionRepo.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch sections.');
    }
  }

  async findOne(id: number) {
    try {
      const section = await this.sectionRepo.findOne(
        { where: { sec_id: id },
         relations:['class']});

      if (!section) {
        throw new NotFoundException(`Section Not Found with this id:${id}`);
      }

      return section
    } catch (error) {
      if (error instanceof HttpException) throw error;
    throw new InternalServerErrorException(`Failed to fetch section`);
    }
  }

  async update(id: number, dto: UpdateSectionDto) {
    if(dto.class_id){
      const cls = await this.classRepo.findOne({
        where: { class_id: dto.class_id },
      });
      if (!cls) {
        throw new NotFoundException(
          `Class does not exits with id ${dto.class_id}`,
        );
      }
    }

    try {
      const section = await this.sectionRepo.preload({ sec_id: id, ...dto });
      if (!section) {
        throw new NotFoundException(`Section not found with this id:${id}`);
      }
      return await this.sectionRepo.save(section);
    } catch (error) {
      if ((error.code == 23505)) {
        throw new BadRequestException('Section already exits on this class');
      }
      throw new InternalServerErrorException('Failed to update the section');
    }
  }


  async remove(id: number) {
      const section = await this.sectionRepo.findOne({ where: { sec_id: id } });
      if (!section) {
        throw new NotFoundException(`Section Not Found`);
      }
  
      try {
        await this.sectionRepo.delete(id);
        return { message: 'Section deleted successfully' };
      } catch (error) {
        throw new InternalServerErrorException('Failed to delete class');
      }
    }
}
