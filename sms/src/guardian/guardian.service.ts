import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guardian } from './entities/guardian.entity';
import { CreateGuardianDto } from './dto/create-guardian.dto';
import { UpdateGuardianDto } from './dto/update-guardian.dto';

@Injectable()
export class GuardianService {
  constructor(
    @InjectRepository(Guardian)
    private guardianRepo: Repository<Guardian>,
  ) {}

  async create(createGuardianDto: CreateGuardianDto): Promise<Guardian> {
    try {
      const guardian = this.guardianRepo.create(createGuardianDto);
      return await this.guardianRepo.save(guardian);
    } catch (error) {
       if (error.code === '23505') {
              throw new BadRequestException('Either email or phone already exists in our database');
            }
      throw new InternalServerErrorException({mesg:'Failed to create guardian',error});
    }
  }

  async findAll(): Promise<Guardian[]> {
    try {
      return await this.guardianRepo.find({relations:{admissions:true}});
      // return await this.guardianRepo.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch guardians');
    }
  }

  async findOne(id: number): Promise<Guardian> {
    const guardian = await this.guardianRepo.findOne({ where: { grdn_id: id } });
    if (!guardian) {
      throw new NotFoundException(`Guardian with ID ${id} not found`);
    }
    return guardian;
  }

  async update(id: number, updateDto: UpdateGuardianDto): Promise<Guardian> {
    const guardian = await this.guardianRepo.preload({
      grdn_id: id,
      ...updateDto,
    });

    if (!guardian) {
      throw new NotFoundException(`Guardian with ID ${id} not found`);
    }

    try {
      return await this.guardianRepo.save(guardian);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update guardian');
    }
  }

  async remove(id: number) {
    try {
      const result = await this.guardianRepo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Guardian with ID ${id} not found.`);
      }
      return { message: 'Guardian deleted successfully.' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete Guardian.');
    }
  }
}
