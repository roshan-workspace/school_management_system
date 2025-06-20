import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
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

  async create(createGuardianDto: CreateGuardianDto) {
    try {
      const guardian = this.guardianRepo.create(createGuardianDto);
      const updatedGuardian =  await this.guardianRepo.save(guardian);
       return {
      id: updatedGuardian.grdn_id,
      full_name: updatedGuardian.full_name,
      email: updatedGuardian.email,
      phone: updatedGuardian.phone,
      occupation: updatedGuardian.occupation,
    };
    } catch (error) {
      if (error.code === '23505') {
        throw new BadRequestException(
          'Either email or phone already exists in our database',
        );
      }
      throw new InternalServerErrorException({
        mesg: 'Failed to create guardian',
        error,
      });
    }
  }

  async findAll() {
    try {
      const GL = await this.guardianRepo.find({
        relations: { admissions: true },
      });

      const guardianInfo = GL.map((grd) => {
        return {
          ID: grd.grdn_id,
          Name: grd.full_name,
          Age: grd.age,
          Address: grd.address,
          Occupation: grd.occupation,
          Email: grd.email,
          Phone: grd.phone,
          Children: grd.admissions.map((child) => {
            return {
              Name: child.fname + ' ' + child?.lname,
              Gender: child.gender,
            };
          }),
        };
      });

      return guardianInfo;
      // return await this.guardianRepo.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch guardians');
    }
  }

  async findOne(id: number) {
    const grd = await this.guardianRepo.findOne({ where: { grdn_id: id } ,relations:{admissions:true}});
    if (!grd) {
      throw new NotFoundException(`Guardian with ID ${id} not found`);
    }

    return {
      ID: grd.grdn_id,
      Name: grd.full_name,
      Age: grd.age,
      Address: grd.address,
      Occupation: grd.occupation,
      Email: grd.email,
      Phone: grd.phone,
      Child:grd.admissions.map((child) => {
            return {
              Name: child.fname + ' ' + child?.lname,
              Gender: child.gender,
            };
          }),
    };
  }

  async update(id: number, updateDto: UpdateGuardianDto) {
    const guardian = await this.guardianRepo.preload({
      grdn_id: id,
      ...updateDto,
    });

    if (!guardian) {
      throw new NotFoundException(`Guardian with ID ${id} not found`);
    }

    try {
      const updatedGuardian =  await this.guardianRepo.save(guardian);
       return {
      id: updatedGuardian.grdn_id,
      full_name: updatedGuardian.full_name,
      email: updatedGuardian.email,
      phone: updatedGuardian.phone,
      occupation: updatedGuardian.occupation,
    };
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
