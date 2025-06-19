import { IsDateString, IsEnum, IsInt, IsNotEmpty } from 'class-validator';
import { Status } from '../constants/const';

export class CreateStudentAttendanceDto {
  @IsInt()
  @IsNotEmpty()
  stud_id: number;
  
  @IsDateString()
  @IsNotEmpty()
  date: string; 

  @IsEnum(Status)
  status:Status;
}
