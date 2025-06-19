import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentAttendanceDto } from './create-student_attendance.dto'; 

export class UpdateStudentAttendanceDto extends PartialType(CreateStudentAttendanceDto) {}