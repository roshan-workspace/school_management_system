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

// later

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Staff) private staffRepo: Repository<Staff>,
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

    const payload = { sub: staff.staff_id, username: staff.username , role: staff.role};
    const token = await this.jwtService.signAsync(payload);
     return {
      message: 'Login successful',
      access_token: token,
      staff_id: staff.staff_id,
    };
  }
}
