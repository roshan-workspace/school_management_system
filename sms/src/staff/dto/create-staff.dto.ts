import {
  IsString,
  IsEmail,
  IsEnum,
  IsInt,
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  MinLength,
  Length,
} from 'class-validator';
import { Gender, StaffRole } from '../constants/const';

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(10, 10, { message: 'Phone number must be exactly 10 digits' })
  phone: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  city: string;

  @IsString()
  @IsNotEmpty()
  @Length(6,6, { message: 'Pin code should be only 6 digits' })
  pin_code: string;

  @IsString()
  @IsNotEmpty()
  subject_specialization: string;

  @IsBoolean()
  @IsNotEmpty()
  is_teaching_staff: boolean;

  @IsDateString()
  @IsNotEmpty()
  hire_date: Date;

  @IsString()
  @IsNotEmpty()
  qualification: string;

  @IsInt()
  @IsNotEmpty()
  school_id: number;

  @IsString()
  @MinLength(6)
  username: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsEnum(StaffRole)
  role: StaffRole;
}
