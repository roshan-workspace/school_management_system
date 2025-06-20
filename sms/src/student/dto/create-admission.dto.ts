import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Gender } from '../constants/const';

export class CreateAdmissionDto {
  @IsNotEmpty()
  @IsString()
  fname: string;

  @IsString()
  @IsOptional()
  mname?: string;

  @IsString()
  @IsOptional()
  lname?: string;

  @IsDateString()
  dob: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  @Matches(/^\d{6}$/, { message: 'PIN code must be 6 digits' })
  pin_code: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^\+?[0-9]{10,15}$/, { message: 'Invalid phone number' })
  phone?: string;

  @IsOptional()
  @IsDateString()
  admission_date: string;

  @IsBoolean()
  any_disability: boolean;

  @IsInt()
  grdn_id?: number;

  @IsInt()
  school_id?: number;
}
