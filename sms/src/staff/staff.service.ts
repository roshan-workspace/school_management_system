import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Staff } from './entities/staff.entity';
import { School } from 'src/school/entity/school.entity';
import { Gender, StaffRole } from './constants/const';

import * as bcrypt from 'bcrypt';

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
      const saltRounds = 10;
      const hasedPassword = await bcrypt.hash(dto.password, saltRounds);
      const newStaff = this.staffRepo.create({
        ...dto,
        password: hasedPassword,
      });
      const addedStaff = await this.staffRepo.save(newStaff);
      return {
        StaffID:addedStaff.staff_id,
        Name: addedStaff.full_name,
        Gender: addedStaff.gender,
        Age: addedStaff.age,
        Email: addedStaff.email,
        Subject: addedStaff.subject_specialization,
        Username: addedStaff.username,
        Role: addedStaff.role,
        Message: 'New Staff Added Successfully',
      };
    } catch (error) {
      if (error.code == 23505) {
        throw new BadRequestException(
          'Either Username or Email already exists',
        );
      }
      throw new InternalServerErrorException('Failed to create new Staff');
    }
  }

  async findWithFilter(
    gender?: Gender,
    username?: string,
    name?: string,
    subject?: string,
    onlyteachers?: boolean,
    role?: StaffRole,
  ) {
    try {
      const where: any = {};
      if (gender) where.gender = gender;
      if (username) where.username = ILike(`%${username}%`);
      if (name) where.full_name = ILike(`%${name}%`);
      if (subject) where.subject_specialization = ILike(`%${subject}%`);
      if (onlyteachers) where.is_teaching_staff = onlyteachers;
      if (role) where.role = role;

      const staffList = await this.staffRepo.find({ where });
      const staffInfo = staffList.map((staff, i) => {
        return {
          StaffID:staff.staff_id,
          Name: staff.full_name,
          Gender: staff.gender,
          Age: staff.age,
          Email: staff.email,
          Subject: staff.subject_specialization,
          Username: staff.username,
          Role: staff.role,
        };
      });

      return staffInfo;
    } catch (error) {
      throw new InternalServerErrorException(
        'Failed to fetch staff with filters.',
      );
    }
  }

  async findOne(id: number) {
    const staff = await this.staffRepo.findOne({
      where: { staff_id: id },
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

    try {
      return await this.staffRepo.save(staff);
    } catch (error) {
      if (error.code == 23505) {
        throw new BadRequestException(
          `Either the email or username already exists`,
        );
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
      await this.staffRepo.delete(id);
      return { message: 'Staff deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete Staff');
    }
  }
}
