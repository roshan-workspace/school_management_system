import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admission } from './entities/admission.entity';
import { CreateAdmissionDto } from './dto/create-admission.dto';
import { UpdateAdmissionDto } from './dto/update-admission.dto';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectRepository(Admission)
    private readonly admissionRepo: Repository<Admission>,
  ) {}

  async create(dto: CreateAdmissionDto) {
    try {
      const admission = this.admissionRepo.create(dto);
      return await this.admissionRepo.save(admission);
    } catch (error) {

      throw new InternalServerErrorException('Failed to create admission');
    }
  }

  async findAll() {
    return await this.admissionRepo.find({ relations: ['guardian'] });
  }

  async findOne(id: number) {
    const admission = await this.admissionRepo.findOne({ where: { adm_id: id }, relations: ['guardian'] });
    if (!admission) throw new NotFoundException(`Admission with ID ${id} not found`);
    return admission;
  }

  async update(id: number, dto: UpdateAdmissionDto) {
    const admission = await this.admissionRepo.preload({ adm_id: id, ...dto });
    if (!admission) throw new NotFoundException(`Admission with ID ${id} not found`);

    try {
      return await this.admissionRepo.save(admission);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update admission');
    }
  }

  async remove(id: number) {
    const result = await this.admissionRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Admission with ID ${id} not found`);
    return { message: 'Admission deleted successfully' };
  }
}
