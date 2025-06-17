import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { School } from 'src/school/entity/school.entity';

@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
    @InjectRepository(School) private schoolRepo: Repository<School>,
  ) {}

  async create(dto: CreateStaffDto) {
    const school = await this.schoolRepo.findOne({
      where: { school_id: dto.school_id },
    });
    if (!school) {
      throw new NotFoundException(
        `School with the id ${dto.school_id} does not exits`,
      );
    }

    try {
      const newStaff = this.staffRepo.create(dto);
      return await this.staffRepo.save(newStaff);
    } catch (error) {
      if (error.code == 23505) {
        throw new BadRequestException('Either Username or Email already exists');
      }
      throw new InternalServerErrorException('Failed to create new Staff');
    }
  }


  async findAll() {
    try {
      return await this.staffRepo.find();
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch classes.');
    }
  }

async findOne(id: number) {
    const staff = await this.staffRepo.findOne({
      where: { staff_id: id }
    });

    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }
    return staff;
  }

 async update(id: number, dto: UpdateStaffDto) {
    const staff = await this.staffRepo.preload({ staff_id: id, ...dto });
    if (!staff) {
      throw new NotFoundException(`Staff with ID ${id} not found`);
    }

    if(dto.school_id){
      const school = await this.schoolRepo.findOne({
        where: { school_id: dto.school_id },
      });
      if (!school) {
        throw new NotFoundException(
          `School with the id ${dto.school_id} does not exits`,
        );
      }
    }

    try {
      return await this.staffRepo.save(staff);
    } catch (error) {
      if(error.code == 23505){
        throw new BadRequestException(`Either the email or username already exists`)
      }
      throw new InternalServerErrorException('Failed to update staff');
    }
  }

  async remove(id: number) {
    const staff = await this.staffRepo.findOne({ where: { staff_id: id } });
    if (!staff) {
      throw new NotFoundException(`Staff Not Found`);
    }
    try {
      await this.staffRepo.delete(id)
      return { message: 'Staff deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete Staff');
    }
  }
}
