import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Status } from '../constants/const';

export class CreateStudentFeeDto {
  @IsInt()
  @IsNotEmpty()
  stud_id: number;

  @IsInt()
  @IsNotEmpty()
  fee_struct_id: number;

  @IsNumber()
  @IsOptional()
  total_due?: number;

  @IsNumber()
  @IsOptional()
  total_paid?: number;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;
}
