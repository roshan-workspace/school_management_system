import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from 'src/staff/entities/staff.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginStaffDto } from './dto/login-staff.dto';
import { JwtService } from '@nestjs/jwt';
import { Admission } from 'src/student/entities/admission.entity';
import { LoginStudentDto } from './dto/login-student.dto';

// later

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
    @InjectRepository(Admission) private admissionRepo: Repository<Admission>,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginStaffDto) {
    const staff = await this.staffRepo.findOne({
      where: { username: dto.username },
    });
    if (!staff) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isValidPassword = await bcrypt.compare(dto.password, staff.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      staff_id: staff.staff_id,
      username: staff.username,
      role: staff.role,
    };
    const token = await this.jwtService.signAsync(payload);
    return {
      message: 'Staff Login successful',
      access_token: token,
    };
  }

  async studentLogin(dto: LoginStudentDto) {
    const student = await this.admissionRepo.findOne({
      where: { username: dto.username },
    });
    if (!student) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isValidPassword = await bcrypt.compare(
      dto.password,
      student.password,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = {
      adm_id: student.adm_id,
      username: student.username,
    };

    const token = await this.jwtService.signAsync(payload);
    return {
      message: 'Student Login successful',
      access_token: token,
    };
  }
}
